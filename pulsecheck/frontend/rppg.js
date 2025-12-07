/**
 * rPPG Implementation
 * Extracts Green channel average from forehead region
 * Uses Peak Detection for BPM calculation
 */

class rPPG {
    constructor() {
        this.isActive = false;
        this.onBPMUpdate = null; // Callback

        // Signal processing
        this.frameBuffer = [];
        this.bufferSize = 250; // ~8 seconds at 30fps
        this.fps = 30;
        this.lastProcessTime = 0;

        // Face detection (simulated ROI for simplicity)
        this.roi = { x: 0.4, y: 0.15, w: 0.2, h: 0.1 }; // Center-ish forehead
    }

    start(videoElement, canvasElement, callback) {
        this.video = videoElement;
        this.canvas = canvasElement;
        this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
        this.onBPMUpdate = callback;
        this.isActive = true;

        this.canvas.width = 300;
        this.canvas.height = 225;

        this.processLoop();
    }

    stop() {
        this.isActive = false;
        this.frameBuffer = [];
    }

    processLoop() {
        if (!this.isActive) return;

        // Draw video frame to small canvas
        this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);

        // Get Green Channel Average
        const greenAvg = this.getGreenAverage();

        // Add to buffer
        const now = Date.now();
        this.frameBuffer.push({ value: greenAvg, time: now });

        // Maintain buffer size
        if (this.frameBuffer.length > this.bufferSize) {
            this.frameBuffer.shift();
        }

        // Process every 1 second
        if (now - this.lastProcessTime > 1000) {
            this.computeBPM();
            this.lastProcessTime = now;
        }

        // Draw ROI for visualization
        this.drawROI();

        requestAnimationFrame(() => this.processLoop());
    }

    getGreenAverage() {
        // Simple fixed ROI for forehead (center-top)
        const sx = Math.floor(this.canvas.width * this.roi.x);
        const sy = Math.floor(this.canvas.height * this.roi.y);
        const sw = Math.floor(this.canvas.width * this.roi.w);
        const sh = Math.floor(this.canvas.height * this.roi.h);

        const frameData = this.ctx.getImageData(sx, sy, sw, sh).data;
        let sumGreen = 0;
        let pixelCount = frameData.length / 4;

        for (let i = 0; i < frameData.length; i += 4) {
            sumGreen += frameData[i + 1]; // G channel
        }

        return sumGreen / pixelCount;
    }

    drawROI() {
        const sx = Math.floor(this.canvas.width * this.roi.x);
        const sy = Math.floor(this.canvas.height * this.roi.y);
        const sw = Math.floor(this.canvas.width * this.roi.w);
        const sh = Math.floor(this.canvas.height * this.roi.h);

        this.ctx.strokeStyle = 'rgba(0, 255, 0, 0.5)';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(sx, sy, sw, sh);
    }

    computeBPM() {
        if (this.frameBuffer.length < this.fps * 5) return; // Need at least 5s of data

        // 1. Extract signal
        const values = this.frameBuffer.map(f => f.value);
        const times = this.frameBuffer.map(f => f.time);

        // 2. Detrend (Simple DC removal via mean subtraction)
        const mean = values.reduce((a, b) => a + b) / values.length;
        const detrended = values.map(v => v - mean);

        // 3. Simple Moving Average Smoothing
        const smoothed = [];
        const windowSize = 5;
        for (let i = 0; i < detrended.length; i++) {
            let sum = 0;
            let count = 0;
            for (let j = i - windowSize; j <= i + windowSize; j++) {
                if (j >= 0 && j < detrended.length) {
                    sum += detrended[j];
                    count++;
                }
            }
            smoothed.push(sum / count);
        }

        // 4. Peak Detection
        // Count peaks to estimate frequency
        let peaks = 0;
        let lastPeakTime = 0;
        const zeroCrossings = [];

        // Simple zero-crossing or local maxima
        // We will use local maxima approach
        const peaksIndices = [];
        for (let i = 1; i < smoothed.length - 1; i++) {
            if (smoothed[i] > smoothed[i - 1] && smoothed[i] > smoothed[i + 1]) {
                // Check if it's a significant peak (optional threshold)
                peaksIndices.push(i);
            }
        }

        // Calculate intervals
        const intervals = [];
        for (let i = 1; i < peaksIndices.length; i++) {
            const t1 = times[peaksIndices[i - 1]];
            const t2 = times[peaksIndices[i]];
            intervals.push(t2 - t1);
        }

        // Average interval
        if (intervals.length > 0) {
            const avgIntervalMs = intervals.reduce((a, b) => a + b) / intervals.length;
            const bpm = 60000 / avgIntervalMs;

            // Constrain 40-200
            if (bpm > 40 && bpm < 200) {
                if (this.onBPMUpdate) this.onBPMUpdate(Math.round(bpm));
            }
        }
    }
}
