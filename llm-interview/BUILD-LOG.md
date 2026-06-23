# 建置紀錄（BUILD LOG）

> 這份檔案記錄「LLM 面試題庫抽卡網站」的每一個建置步驟、決策理由、以及上網查證的來源。
> 目的：讓面試官能追溯每一步、知道內容從哪來、哪裡可能出錯。
> 由 Claude 維護，依時間順序往下追加。

---

## 0. 任務目標（來自面試官的需求）

1. **優化問題** — 讓候選人更好懂、有發揮空間、能從不同角度切入或 debate
2. **寫參考答案** — 必須詳細，每題不只一種答案
3. **打標籤** — 依主題與難度分類
4. **做成 HTML 網站** — 可本地開啟、抽卡顯示題目與答案（給面試官看）
5. **歡迎與指導頁** — 並在 HTML 說明「答錯/不知道沒關係，重點是怎麼思考」

額外要求：
- 不確定的地方一定要上網查（已落實，見第 2 節來源）
- 每一步在資料夾內留紀錄（即本檔案）

---

## 1. 探索既有素材（已完成）

- `llm-interview/raw/raw-questions.md` — 原始題目，分「一面・技術基礎」「二面・深度進階」，約 40 條一句話問題。屬於 **LLM/ML 知識型面試**，與 repo 既有的 Signal/Algorithm live-coding 面試是兩套不同東西。
- repo 既有 `interview.md` / `welcome.md` — 風格參考：用 BARS 量表、陷阱題、「怎麼想比答對重要」的理念。我沿用這個語氣與「green/red flag」格式。

**決策**：新做的題庫獨立放在 `llm-interview/web/`，不動既有檔案。

---

## 2. 上網查證的技術事實（已完成）

為確保參考答案正確且跟上 2024–2025 進展，針對「會演化 / 細節易錯」的主題做了 9 次 web 查證。重點結論與來源：

| 主題 | 查證後的關鍵結論 | 主要來源 |
|------|----------------|---------|
| LoRA rank / 變體 | rsLoRA 把縮放 α/r → α/√r 以穩定高 rank；DoRA 拆 magnitude+direction，常勝 LoRA 1–4%；2025 起手式 r=16+DoRA+all-linear | HuggingFace blog (rslora)、arXiv 2312.03732、mbrenndoerfer PEFT |
| 量化 | GPTQ=權重量化+Hessian 逐層；AWQ=保護高激活的顯著通道；SmoothQuant=把激活 outlier 難度搬到權重(W8A8)；LLM.int8()=outlier 維度留 fp16 其餘 int8 | bentoml LLM handbook、AWS SageMaker blog、cast.ai |
| 稀疏注意力 | StreamingLLM 的 attention sink：留前 ~4 token KV + 滑動窗即可處理近無限長；Longformer=窗+全域、BigBird=窗+全域+隨機；Mistral/Gemma=SWA | arXiv 2309.17453、arXiv 2404.14294 (efficient inference survey) |
| GraphRAG | 4 階段：實體/關係抽取→Leiden 社群偵測(階層)→社群摘要→local(實體鄰域)/global(社群摘要)檢索 | Microsoft/Bertelsmann tech blog、memgraph、zilliz |
| Generative Agents 記憶 | 分數 = recency + importance + relevance（α 各=1）；recency 指數衰減 γ=0.995/hr；importance LLM 評 1–10；relevance 餘弦相似；min-max 正規化 | arXiv 2304.03442、dl.acm.org 3586183 |
| 推理服務優化 | PagedAttention=KV 分頁非連續；continuous batching=iteration 級、吞吐 2-3x；GQA/MQA 減 KV head；投機解碼=小 draft 模型提案 k token | vllm.ai blog、spheron blog、docs.vllm.ai |
| PPO / RLHF | reward 內含 KL：R = r_θ − β(log π_φ − log π_ref)；reference 通常是 SFT 模型；KL 防 reward hacking + 保留先驗；β 是最關鍵超參 | apxml RLHF、HuggingFace the_n_implementation_details_of_rlhf |
| DPO vs PPO | PPO=線上 on-policy(4 模型)；DPO=離線(2 模型，隱式 reward 無需 reward model)；線上多半較好(on-policy 取樣)，但結論不一 | arXiv 2405.08448、spheron DPO-vs-PPO guide |
| FlashAttention | 精確(結果一致)、IO-aware；FLOPs 因重算反而略增，但大減 HBM 讀寫→更快、記憶體隨 n 線性。重點：降 IO 比降 FLOPs 更重要 | arXiv 2205.14135 |

---

## 3. 內容資料結構（決策）

檔案：`llm-interview/web/questions.js`（單一資料來源，用 `<script>` 載入以支援 file:// 直接開啟，避免 fetch 的 CORS 問題）。

每張卡片欄位：`id / round / topics[] / difficulty(1-3) / q(優化問題) / raw(原題) / intent(考點) / angles[](切入角度) / answers[](多種參考答案) / followups[](追問) / debate(可辯論處) / green[](好訊號) / red[](警訊)`。

**卡片切分決策**：把原始 ~40 條一句話，整併/拆分為 **37 張卡**（一面 16 + 二面 21）。例如「r 怎麼選」與「r 大小影響」合併為一張；「GPU 分配」與「延遲/吞吐調度」拆成兩張各自展開。

**內文格式**：極簡 markdown（`**粗體**`、`- ` 項目、空行分段、unicode 數學符號），由 app.js 自寫的小 renderer 渲染。為避免 JS 模板字串衝突，內文不用反引號 code，改用粗體與 unicode。

---

## 4. 內容完成 — questions.js（已完成）

共 **37 張卡片**（一面 16 + 二面 21），用 `node -e` 驗證過：JS 可解析、無重複 id、round 分布正確。

**一面・技術基礎（16）**：Transformer 總覽、降低複雜度、稀疏注意力、LoRA 原理、LoRA rank、KV cache、RAG 流程、向量庫召回退化、微調資料構建、RAG+知識圖譜、LoRA 作用層、高併發延遲、多執行緒vs多進程、GPU 共用分配、延遲vs吞吐、三數之和。

**二面・深度進階（21）**：self-attention 詳解、複雜度推導、multi-head、PPO clip、線上vs離線 RL、RLHF 定位、reference model、multi-agent 協同、agent 衝突、框架選型、記憶系統、長期記憶查詢、記憶衰退、VQA+動作協同、human feedback 消化、模型壓縮、端側推理、量化精度補償、速度vs精度、召回精排vs生成、電商多模態。

主題標籤（17）：Transformer / Attention / 效率優化 / 微調(PEFT) / 推理優化 / RAG / 資料 / 知識圖譜 / 系統設計 / 工程實踐 / 演算法 / 強化學習(RLHF) / Agent / 記憶系統 / 多模態 / 模型壓縮 / Embedded。

每張卡都有：優化問題 + 原題 + 考點 + 多個切入角度 + 多種參考答案 + 追問 + 可辯論處 + green/red flags。多數技術細節對照第 2 節查證的來源撰寫。

## 5. 抽卡網站（已完成）

檔案放在 `llm-interview/web/`：
- `index.html` — 歡迎/指導頁 + 抽卡主畫面（含「答錯沒關係、看思考」的面試理念）
- `styles.css` — 深色主題、難度色碼、green/red flag 樣式、RWD
- `app.js` — 自寫極簡 markdown renderer + 篩選 + 抽卡(不重複) + 歷史 + 瀏覽模式 + modal + 鍵盤操作
- `questions.js` — 題庫資料（唯一來源）
- `README.md` — 使用說明

設計重點：純前端、無框架、無外部相依，用 `<script>` 載入資料 → 可 `file://` 直接雙擊開啟。

## 6. 本地測試（已完成，用 gstack /browse headless Chromium）

逐項驗證，全程 **0 console error**：
- ✅ 歡迎頁正確渲染（理念 + how-to），題數顯示 37
- ✅ 「開始抽卡」進入主畫面
- ✅ 抽一張 → 顯示題目；翻看答案 → 6 個區塊全出（考點/角度/答案/追問/辯論/flags），3 角度 + 3 答案 + green/red 各 1
- ✅ 主題篩選（RAG → 5 題）、清除篩選（回 37）
- ✅ 瀏覽全部列出 37 題、點開 modal 正常
- ✅ 三數之和程式碼區塊正確渲染，`<`/`>` 有正確 escape（無 HTML 注入）
- ✅ 桌機 / 手機（390px）版面都正常（flags 在手機改單欄）

截圖存於 /tmp/llm-welcome.png、/tmp/llm-card.png、/tmp/llm-mobile.png（測試用，非交付物）。

## 7. 進度（全部完成）

- [x] 探索既有素材
- [x] 上網查證技術事實（9 次搜尋）
- [x] questions.js（37 卡，已驗證）
- [x] HTML / CSS / JS 抽卡網站
- [x] 本地測試（0 console error，桌機+手機）

**交付物**：`llm-interview/web/`（直接開 index.html）。改題改 `questions.js`。

---

## 8. 第二輪修改（依面試官回饋）

回饋三點：(1) 中文術語要補英文並標記、(2) 答案要口語化 + 邏輯通順、(3) 公式用 markdown 比較好讀。

**做法**
- **英文術語標記**：app.js 的 renderer 新增 `markEn()`，自動把長度 ≥2 的英文 / 拉丁術語包成 `<span class="en">`，CSS 渲染成襯線斜體（法式編輯排版常用斜體標外來語）。同時內容裡幫中文術語補上英文，例如「稀疏注意力（Sparse Attention）」。單字母數學變數（O、r、n…）跳過不標，避免把公式打散。
- **法式簡約改版**：styles.css 全面重寫——暖米白紙底 + 墨黑字、髮絲線取代陰影、襯線標題、大量留白、單一暗灰藍 accent、難度用沉穩的 sage / ochre / terracotta。
- **答案口語化**：questions.js 全 37 卡的 q / intent / angles / answers / debate / flags 重寫成「像跟同事解釋」的口吻，邏輯更連貫，但資訊量不變、技術事實不變。
- **公式 markdown 化**：把會被英文標記打散的方程式改成 code：
  - 程式碼區塊（顯示級）：self-attention 公式、PPO clip 目標、RLHF reward+KL、三數之和程式。
  - 行內 code：LoRA 的 `W = W₀ + ΔW`、`h = W₀x + B(Ax)`、PPO 的 `r(θ)=π/π_old`、記憶 `score = recency + importance + relevance` 等。

**重新測試（gstack /browse，0 console error）**
- ✅ 全 37 卡逐張渲染掃描：無 undefined、無外洩的 ``` 圍欄、無殘留的字面 **。
- ✅ 英文術語正確標記（單張卡 49–68 個 .en）、PagedAttention 等有被標到。
- ✅ 數字 / 程式碼不被誤標（800ms、r=8、O(n²·d) 都正常）。
- ✅ 4 個程式碼區塊 + LoRA 4 個行內公式正確渲染。
- ✅ 桌機 + 手機版面、法式簡約風格確認。

renderer 重點：`fmt()` 以反引號切出 code 段（避免被英文標記 / 粗體干擾），其餘做 跳脫 → markEn → 粗體；`renderMd()` 處理 ``` 區塊。注意 **粗體與行內 code 不要寫在同一段**（會互相破壞），公式若要顯示就用獨立 code 區塊。
