# GM AI Coding Interview

Signal / Algorithm Engineer 面試框架與素材。

## 結構

```
├── welcome.md              ← 給候選人的說明信（面試前寄出）
├── interview.md            ← 面試官完整指南（不給候選人看）
├── task1/
│   ├── README.md           ← Task 1 指導語
│   └── rep_counter.py      ← Overengineered codebase（給候選人）
├── task2/
│   ├── README.md           ← Task 2 指導語
│   └── sleep_exercise.csv  ← 分析用資料（給候選人）
└── task3/
    └── README.md           ← Task 3 指導語
```

## 給候選人的素材

候選人只會拿到：
- `welcome.md` — 面試前寄出，說明流程和準備事項
- `task1/` — rep_counter.py + README
- `task2/` — sleep_exercise.csv + README
- `task3/` — README（口頭題）

**`interview.md` 是面試官專用文件，不要給候選人看。**

## Release

每次面試前，從 GitHub Releases 下載最新的 candidate 版本壓縮包寄給候選人。Release 中不包含 `interview.md`。

## 面試流程

| Task | 時間 | 形式 | 內容 |
|------|------|------|------|
| Task 1 | 30 min | Live Coding | 在 overengineered codebase 上加新功能 |
| Task 2 | 40 min | Live Coding | 分析有問題的資料，驗證 PM 結論 |
| Task 3 | 15 min | 口頭 | 系統設計，需求裡藏著錯誤前提 |
