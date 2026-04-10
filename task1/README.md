# Task 1 — 在現有 Codebase 上加新功能

> 🌐 **語言：** 繁體中文｜[English version](README.en.md)

歡迎！這個任務會請你在一個已有的 Python codebase 上加入新功能。

## 你會拿到的東西

- `rep_counter.py` — 一個運動 rep 計數器，已經可以正常運行

## 任務說明

教練想知道哪幾下動作太快，請在不破壞現有 `count()` 介面的前提下，加入 `detect_fast_reps()`，回傳每個 rep 是否低於 800ms。

詳細的函式簽名和範例寫在 `rep_counter.py` 底部的 TODO 區塊中。

## 快速開始

你可以用以下方式生成一段測試訊號（模擬 5 秒的手臂運動加速度，100Hz 取樣）：

```python
import numpy as np
np.random.seed(0)
fs = 100.0
t = np.arange(0, 5, 1/fs)
signal = np.sin(2 * np.pi * 1.5 * t) + 0.3 * np.random.randn(len(t))
```

現有的 `count()` 可以直接跑：

```python
from rep_counter import RepCounter
rc = RepCounter()
result = rc.count(signal, fs=100.0)
print(f"偵測到 {result.count} 個 reps，位置在 {result.peak_indices}")
```

歡迎自己調整訊號參數來測試不同情境。

## 環境

- 語言：Python
- 需要套件：numpy、scipy
- 全程開放使用任何 AI 工具，沒有限制

## 面試時的小提醒

詳細說明請見根目錄的 `welcome.md`，這裡是快速版：

- **邊做邊講**：請把你的思考過程說出來。例如「我先讀一下這個 class」、「我打算用 X 方式實作 detect_fast_reps，因為 Y」、「我要問 AI 一個關於 Z 的問題」。安靜寫 code 二十分鐘對你不利。
- **遇到不清楚的地方**：先做合理假設並說出來。例如「我先假設 sampling rate 固定是 100Hz」，然後在這個假設下繼續做，不要卡住。
- **不會的東西**：直接上網查或問 AI，不要硬猜。

祝順利！
