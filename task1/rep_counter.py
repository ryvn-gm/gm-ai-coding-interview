import numpy as np
from scipy.signal import butter, sosfilt
from scipy.ndimage import gaussian_filter1d
from dataclasses import dataclass
from typing import List, Optional, Tuple
import logging

# ─── Config dataclasses ───────────────────────────────────────────────────────

@dataclass
class FilterConfig:
    order: int = 4
    cutoff_low: float = 0.5
    cutoff_high: float = 5.0
    fs: float = 100.0
    filter_type: str = 'bandpass'
    smoothing_sigma: float = 1.5

@dataclass
class KalmanState:
    x: float = 0.0
    p: float = 1.0
    q: float = 0.001
    r: float = 0.1

@dataclass
class PeakConfig:
    min_height_factor: float = 0.3
    min_distance_ms: int = 500
    adaptive_window: int = 50
    smoothing_sigma: float = 1.5

@dataclass
class RepResult:
    count: int
    peak_indices: List[int]
    signal_quality: float = 1.0  # reserved for future use

# ─── Pipeline stages ──────────────────────────────────────────────────────────

class SignalPreprocessor:
    def __init__(self, config: FilterConfig):
        self.config = config
        self._sos = None
        self._init_filter()

    def _init_filter(self):
        nyq = self.config.fs / 2
        if self.config.filter_type == 'bandpass':
            low  = self.config.cutoff_low  / nyq
            high = self.config.cutoff_high / nyq
            self._sos = butter(self.config.order, [low, high], btype='band', output='sos')
        else:
            cutoff = self.config.cutoff_high / nyq
            self._sos = butter(self.config.order, cutoff, btype='low', output='sos')

    def apply(self, signal: np.ndarray) -> np.ndarray:
        filtered = sosfilt(self._sos, signal)
        # gaussian smooth after bandpass — already removes high-freq noise above
        smoothed = gaussian_filter1d(filtered, sigma=self.config.smoothing_sigma)
        return smoothed


class KalmanSmoother:
    """Scalar Kalman filter for 1-D signal smoothing."""
    def __init__(self, state: KalmanState):
        self.state = state

    def smooth(self, measurements: np.ndarray) -> np.ndarray:
        result = np.zeros_like(measurements)
        x, p = self.state.x, self.state.p
        for i, z in enumerate(measurements):
            p = p + self.state.q          # predict
            k = p / (p + self.state.r)    # kalman gain
            x = x + k * (z - x)          # update
            p = (1 - k) * p
            result[i] = x
        return result


class AdaptiveThresholdDetector:
    def __init__(self, config: PeakConfig):
        self.config = config

    def _compute_adaptive_threshold(self, signal: np.ndarray) -> np.ndarray:
        """O(n * window) sliding local threshold."""
        thresholds  = np.zeros(len(signal))
        half_window = self.config.adaptive_window // 2
        for i in range(len(signal)):                          # O(n) outer loop
            start = max(0, i - half_window)
            end   = min(len(signal), i + half_window)
            local_max = np.max(signal[start:end])             # O(window) inner
            local_min = np.min(signal[start:end])
            thresholds[i] = local_min + (local_max - local_min) * self.config.min_height_factor
        return thresholds

    def detect(self, signal: np.ndarray) -> List[int]:
        thresholds    = self._compute_adaptive_threshold(signal)
        min_distance  = int(self.config.min_distance_ms * 100 / 1000)
        peaks         = []
        last_peak     = -min_distance
        for i in range(1, len(signal) - 1):
            if (signal[i] > signal[i - 1] and
                signal[i] > signal[i + 1] and
                signal[i] > thresholds[i] and
                i - last_peak >= min_distance):
                peaks.append(i)
                last_peak = i
        return peaks


# ─── Top-level class ──────────────────────────────────────────────────────────

class RepCounter:
    def __init__(
        self,
        filter_config: Optional[FilterConfig] = None,
        kalman_state:  Optional[KalmanState]  = None,
        peak_config:   Optional[PeakConfig]   = None,
    ):
        self.filter_config = filter_config or FilterConfig()
        self.kalman_state  = kalman_state  or KalmanState()
        self.peak_config   = peak_config   or PeakConfig()

        self.preprocessor = SignalPreprocessor(self.filter_config)
        self.smoother      = KalmanSmoother(self.kalman_state)
        self.detector      = AdaptiveThresholdDetector(self.peak_config)

        self._pipeline_cache: dict = {}
        self.logger = logging.getLogger(__name__)

    def count(self, raw_signal: np.ndarray, fs: float = 100.0) -> RepResult:
        cache_key = hash(raw_signal.tobytes())
        if cache_key in self._pipeline_cache:
            return self._pipeline_cache[cache_key]

        self.logger.debug(f"Processing signal of length {len(raw_signal)}")

        filtered = self.preprocessor.apply(raw_signal)   # bandpass + gaussian
        smoothed = self.smoother.smooth(filtered)         # kalman on top of already-smooth signal
        peaks    = self.detector.detect(smoothed)

        result = RepResult(count=len(peaks), peak_indices=peaks)
        self._pipeline_cache[cache_key] = result
        return result


# ─── TODO: 新功能需求 ──────────────────────────────────────────────────────────
#
#   請在不破壞現有 count() 介面的前提下，加入以下功能：
#
#   detect_fast_reps(raw_signal, fs=100.0, fast_threshold_ms=800)
#       -> 回傳一個 list of bool，長度等於 RepResult.count
#          True  = 這個 rep 的間距 < fast_threshold_ms（動作太快）
#          False = 正常速度
#          第一個 rep 沒有前一個可以比較，固定回傳 False
#
#   範例：5 reps，第 2、4 個間距太短
#       -> [False, True, False, True, False]
#
# ─────────────────────────────────────────────────────────────────────────────