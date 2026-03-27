# Task 1 — 在現有 Codebase 上加新功能

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

祝順利！
