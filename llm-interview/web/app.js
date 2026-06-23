/* ===========================================================
 * LLM / 演算法面試抽卡 — 前端邏輯（無框架、可 file:// 直接開）
 * =========================================================== */

const DIFF = {
  1: { label: '基礎', star: '⭐' },
  2: { label: '進階', star: '⭐⭐' },
  3: { label: '深入', star: '⭐⭐⭐' },
};
const ROUND = { 1: '一面・技術基礎', 2: '二面・深度進階' };

/* ---------- 極簡 markdown 渲染 + 英文術語標記 ---------- */
function escHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function escMin(s) {                       // 只跳脫 < >（保留 & 不影響英文標記）
  return String(s).replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
// 把英文 / 拉丁專有名詞（長度 ≥2）包成 <span class="en">；跳過單字母數學變數
const EN_RE = /(^|[^&A-Za-z0-9])([A-Za-z][A-Za-z0-9+.'’\/-]+(?:\s[A-Za-z][A-Za-z0-9+.'’\/-]*)*)/g;
function markEn(s) {
  return s.replace(EN_RE, (m, pre, term) => pre + '<span class="en">' + term + '</span>');
}
// 行內格式：以反引號切出 code 段，其餘做 跳脫 → 標記英文 → 粗體
function fmt(raw) {
  if (raw == null) return '';
  const parts = String(raw).split('`');
  let out = '';
  parts.forEach((part, i) => {
    if (i % 2 === 1) {
      out += '<code>' + escMin(part) + '</code>';
    } else {
      let s = escMin(part);
      s = markEn(s);
      s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      out += s;
    }
  });
  return out;
}
function renderText(text) {
  const lines = text.split('\n');
  let html = '', listType = null;
  const flushList = () => { if (listType) { html += '</' + listType + '>'; listType = null; } };
  for (const line of lines) {
    const t = line.trim();
    if (t === '') { flushList(); continue; }
    const bullet = /^- (.*)/.exec(t);
    const num = /^(\d+)\.\s+(.*)/.exec(t);
    if (bullet) {
      if (listType !== 'ul') { flushList(); html += '<ul>'; listType = 'ul'; }
      html += '<li>' + fmt(bullet[1]) + '</li>';
    } else if (num) {
      if (listType !== 'ol') { flushList(); html += '<ol>'; listType = 'ol'; }
      html += '<li>' + fmt(num[2]) + '</li>';
    } else {
      flushList();
      html += '<p>' + fmt(t) + '</p>';
    }
  }
  flushList();
  return html;
}
function renderMd(raw) {                    // 處理 ``` 程式碼區塊 + 一般文字
  if (!raw) return '';
  const parts = String(raw).split('```');
  let html = '';
  parts.forEach((part, i) => {
    if (i % 2 === 1) {
      const code = part.replace(/^[a-zA-Z0-9+\-]*\n/, '').replace(/^\n+|\n+$/g, '');
      html += '<pre><code>' + escHtml(code) + '</code></pre>';
    } else {
      html += renderText(part);
    }
  });
  return html;
}

/* ---------- 卡片 HTML ---------- */
function tagsHtml(card) {
  const d = DIFF[card.difficulty];
  let h = '<div class="card-tags">';
  h += `<span class="tag tag-round">${ROUND[card.round]}</span>`;
  h += `<span class="tag tag-diff d${card.difficulty}">${d.star} ${d.label}</span>`;
  for (const t of card.topics) h += `<span class="tag tag-topic">${escHtml(t)}</span>`;
  h += '</div>';
  return h;
}

function blocksHtml(items, kind) {
  return items.map(it =>
    `<div class="block">
       <p class="block-title ${kind}">${fmt(it.t)}</p>
       <div class="block-body">${renderMd(it.b)}</div>
     </div>`).join('');
}

function answerHtml(card) {
  let h = '';
  if (card.intent) {
    h += `<div class="sec sec-intent"><p class="sec-title">這題在考什麼</p>
            <div class="intent-box">${renderMd(card.intent)}</div></div>`;
  }
  if (card.angles && card.angles.length) {
    h += `<div class="sec"><p class="sec-title">可以怎麼答 · 不同切入角度</p>${blocksHtml(card.angles, 'angle')}</div>`;
  }
  if (card.answers && card.answers.length) {
    h += `<div class="sec"><p class="sec-title">參考答案（不只一種）</p>${blocksHtml(card.answers, 'answer')}</div>`;
  }
  if (card.followups && card.followups.length) {
    h += `<div class="sec"><p class="sec-title">可以追問</p><ul class="followups">${
      card.followups.map(f => '<li>' + fmt(f) + '</li>').join('')}</ul></div>`;
  }
  if (card.debate) {
    h += `<div class="sec sec-debate"><p class="sec-title">沒有標準答案 · 可辯論之處</p>
            <div class="debate-box">${renderMd(card.debate)}</div></div>`;
  }
  if ((card.green && card.green.length) || (card.red && card.red.length)) {
    h += '<div class="sec"><p class="sec-title">訊號參考</p><div class="flags">';
    if (card.green && card.green.length)
      h += `<div class="flag-col green"><h4>✅ 好訊號</h4><ul>${card.green.map(x => '<li>' + fmt(x) + '</li>').join('')}</ul></div>`;
    if (card.red && card.red.length)
      h += `<div class="flag-col red"><h4>⚠️ 警訊</h4><ul>${card.red.map(x => '<li>' + fmt(x) + '</li>').join('')}</ul></div>`;
    h += '</div></div>';
  }
  return h;
}

function cardHtml(card, revealed) {
  let h = '<div class="card">';
  h += '<div class="card-head">';
  h += tagsHtml(card);
  h += `<p class="card-q">${fmt(card.q)}</p>`;
  if (card.raw) h += `<p class="card-raw">原題：<span>${fmt(card.raw)}</span></p>`;
  h += '</div>';
  h += '<div class="card-body">';
  if (revealed) h += answerHtml(card);
  else h += '<div class="answer-locked">— 按「翻看參考答案」顯示考點與解法 —</div>';
  h += '</div></div>';
  return h;
}

/* ---------- 狀態 ---------- */
const state = {
  round: null,            // null=全部
  diffs: new Set(),       // 空=全部
  topics: new Set(),      // 空=全部
  mode: 'draw',
  deck: [],               // 本輪尚未抽出的 id（不重複）
  history: [],            // 抽過的卡片（依序）
  pos: -1,                // history 指標
  poolSize: 0,
  shuffleRound: 1,
  _modal: null,
};

const $ = sel => document.querySelector(sel);

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getPool() {
  return QUESTIONS.filter(c => {
    if (state.round && c.round !== state.round) return false;
    if (state.diffs.size && !state.diffs.has(c.difficulty)) return false;
    if (state.topics.size && !c.topics.some(t => state.topics.has(t))) return false;
    return true;
  });
}

function rebuildDeck() {
  const pool = getPool();
  state.poolSize = pool.length;
  state.deck = shuffle(pool.map(c => c.id));
  state.shuffleRound = 1;
  updatePoolInfo();
  updateDeckStatus();
}

function updatePoolInfo() {
  $('#poolInfo').innerHTML = `符合篩選：<strong>${state.poolSize}</strong> / ${QUESTIONS.length} 題`;
}

function updateDeckStatus() {
  const el = $('#deckStatus');
  if (state.mode !== 'draw') { el.textContent = ''; return; }
  if (state.poolSize === 0) { el.textContent = '目前篩選沒有符合的題目，請調整篩選。'; return; }
  const drawn = state.poolSize - state.deck.length;
  let s = `本輪已抽 ${drawn} / ${state.poolSize} 題　·　剩 ${state.deck.length} 題未抽`;
  if (state.shuffleRound > 1) s += `　·　第 ${state.shuffleRound} 輪`;
  el.textContent = s;
}

function cardById(id) { return QUESTIONS.find(c => c.id === id); }

/* ---------- 抽卡 ---------- */
function drawNew() {
  if (state.poolSize === 0) return;
  if (state.deck.length === 0) {           // 抽完一輪 → 重新洗牌
    state.deck = shuffle(getPool().map(c => c.id));
    state.shuffleRound++;
  }
  const id = state.deck.pop();
  const card = cardById(id);
  state.history.push({ card, revealed: false });
  state.pos = state.history.length - 1;
  renderCurrent();
  updateDeckStatus();
}

function goPrev() {
  if (state.pos > 0) { state.pos--; renderCurrent(); }
}

function revealCurrent() {
  if (state.pos < 0) return;
  state.history[state.pos].revealed = true;
  renderCurrent();
}

function renderCurrent() {
  const entry = state.history[state.pos];
  if (!entry) return;
  $('#cardSlot').innerHTML = cardHtml(entry.card, entry.revealed);
  $('#prevBtn').disabled = state.pos <= 0;
  $('#revealBtn').disabled = entry.revealed;
  $('#revealBtn').textContent = entry.revealed ? '已顯示答案' : '翻看參考答案';
  $('#cardSlot').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ---------- 篩選 UI ---------- */
function buildFilters() {
  const rf = $('#roundFilter');
  rf.innerHTML = '';
  [[null, '全部'], [1, '一面'], [2, '二面']].forEach(([val, label]) => {
    const b = document.createElement('button');
    b.className = 'chip' + (state.round === val ? ' on' : '');
    b.textContent = label;
    b.onclick = () => { state.round = val; refreshAll(); };
    rf.appendChild(b);
  });
  const df = $('#diffFilter');
  df.innerHTML = '';
  [1, 2, 3].forEach(d => {
    const b = document.createElement('button');
    b.className = 'chip diff' + d + (state.diffs.has(d) ? ' on diff' + d : '');
    b.textContent = DIFF[d].star + ' ' + DIFF[d].label;
    b.onclick = () => { state.diffs.has(d) ? state.diffs.delete(d) : state.diffs.add(d); refreshAll(); };
    df.appendChild(b);
  });
  const topics = [];
  QUESTIONS.forEach(c => c.topics.forEach(t => { if (!topics.includes(t)) topics.push(t); }));
  const tf = $('#topicFilter');
  tf.innerHTML = '';
  topics.forEach(t => {
    const b = document.createElement('button');
    b.className = 'chip' + (state.topics.has(t) ? ' on' : '');
    b.textContent = t;
    b.onclick = () => { state.topics.has(t) ? state.topics.delete(t) : state.topics.add(t); refreshAll(); };
    tf.appendChild(b);
  });
}

function refreshAll() {
  buildFilters();
  rebuildDeck();
  if (state.mode === 'list') renderList();
}

/* ---------- 瀏覽模式 ---------- */
function renderList() {
  const pool = getPool();
  const c = $('#listContainer');
  if (pool.length === 0) { c.innerHTML = '<div class="li-empty">目前篩選沒有符合的題目。</div>'; return; }
  c.innerHTML = pool.map(card => {
    const d = DIFF[card.difficulty];
    const topics = card.topics.map(t => `<span class="tag tag-topic">${escHtml(t)}</span>`).join('');
    return `<div class="list-item" data-id="${card.id}">
      <span class="li-diff tag tag-diff d${card.difficulty}">${d.star}</span>
      <span class="li-q">${fmt(card.q)}</span>
      <span class="li-topics">${topics}</span>
    </div>`;
  }).join('');
  c.querySelectorAll('.list-item').forEach(el => {
    el.onclick = () => openModal(el.dataset.id);
  });
}

/* ---------- Modal ---------- */
function openModal(id) {
  const card = cardById(id);
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `<div class="modal-card">
      <button class="btn btn-secondary modal-close">✕ 關閉</button>
      ${cardHtml(card, true)}
    </div>`;
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(overlay); });
  overlay.querySelector('.modal-close').onclick = () => closeModal(overlay);
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  state._modal = overlay;
}
function closeModal(overlay) {
  overlay.remove();
  document.body.style.overflow = '';
  state._modal = null;
}

/* ---------- 模式切換 ---------- */
function setMode(mode) {
  state.mode = mode;
  $('#modeDrawBtn').classList.toggle('active', mode === 'draw');
  $('#modeListBtn').classList.toggle('active', mode === 'list');
  $('#drawMode').classList.toggle('hidden', mode !== 'draw');
  $('#listMode').classList.toggle('hidden', mode !== 'list');
  if (mode === 'list') renderList();
  updateDeckStatus();
}

/* ---------- 頁面切換 ---------- */
function enterApp() {
  $('#welcome').classList.add('hidden');
  $('#app').classList.remove('hidden');
  window.scrollTo(0, 0);
}
function goHome() {
  $('#app').classList.add('hidden');
  $('#welcome').classList.remove('hidden');
  window.scrollTo(0, 0);
}

/* ---------- 初始化 ---------- */
function init() {
  $('#welcomeCount').textContent = QUESTIONS.length;
  buildFilters();
  rebuildDeck();

  $('#enterBtn').onclick = enterApp;
  $('#homeBtn').onclick = goHome;
  $('#drawBtn').onclick = drawNew;
  $('#prevBtn').onclick = goPrev;
  $('#revealBtn').onclick = revealCurrent;
  $('#clearFilters').onclick = () => {
    state.round = null; state.diffs.clear(); state.topics.clear(); refreshAll();
  };
  $('#modeDrawBtn').onclick = () => setMode('draw');
  $('#modeListBtn').onclick = () => setMode('list');

  document.addEventListener('keydown', e => {
    if (state._modal) { if (e.key === 'Escape') closeModal(state._modal); return; }
    if ($('#app').classList.contains('hidden')) {
      if (e.key === 'Enter') enterApp();
      return;
    }
    if (state.mode !== 'draw') return;
    if (e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      const entry = state.history[state.pos];
      if (entry && !entry.revealed) revealCurrent(); else drawNew();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault(); drawNew();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault(); goPrev();
    } else if (e.key.toLowerCase() === 'r') {
      revealCurrent();
    }
  });
}

if (typeof QUESTIONS === 'undefined') {
  document.body.innerHTML = '<p style="padding:40px;color:#b0604a">questions.js 載入失敗，請確認檔案存在於同一資料夾。</p>';
} else {
  init();
}
