// DOM Elements
const video = document.getElementById('webcam');
const canvas = document.getElementById('overlay');
const startBtn = document.getElementById('startBtn');
const saveBtn = document.getElementById('saveBtn');
const bpmDisplay = document.getElementById('bpmValue');
const stressDisplay = document.getElementById('stressValue');
const stressBadge = document.getElementById('stressBadge');
const historyTableBody = document.querySelector('#historyTable tbody');
const refreshBtn = document.getElementById('refreshHistory');

// State
let isScanning = false;
let currentBpm = 0;
let currentStress = 'Wait';
let chart;
const rppg = new rPPG();

// Backend URL
const API_URL = 'http://localhost:5000/api';

// Initialize Chart
function initChart() {
    const ctx = document.getElementById('bpmChart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Heart Rate (BPM)',
                data: [],
                borderColor: '#4a90e2',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(74, 144, 226, 0.1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    suggestedMin: 50,
                    suggestedMax: 120
                },
                x: {
                    display: false // Hide time labels for clean look
                }
            },
            animation: {
                duration: 0 // Disable animation for realtime updates
            }
        }
    });
}

// Webcam Setup
async function setupCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: 640, height: 480 }
        });
        video.srcObject = stream;
        return new Promise((resolve) => {
            video.onloadedmetadata = () => resolve(video);
        });
    } catch (e) {
        alert('Error accessing webcam. Please allow access.');
        console.error(e);
    }
}

// Stress Logic
function determineStress(bpm) {
    if (bpm < 70) return 'Relaxed';
    if (bpm >= 70 && bpm <= 90) return 'Normal';
    if (bpm > 90 && bpm <= 110) return 'Alert';
    return 'High';
}

function getBadgeClass(stress) {
    if (stress === 'Relaxed') return 'relaxed';
    if (stress === 'Normal') return 'normal';
    if (stress === 'Alert') return 'alert';
    if (stress === 'High') return 'high';
    return '';
}

// Update UI
function updateDisplay(bpm) {
    currentBpm = bpm;
    currentStress = determineStress(bpm);

    bpmDisplay.innerText = bpm;
    stressDisplay.innerText = currentStress;
    stressBadge.innerText = currentStress;

    // Update Badge Color
    stressBadge.className = 'badge ' + getBadgeClass(currentStress);

    // Update Chart
    const now = new Date().toLocaleTimeString();
    if (chart.data.labels.length > 30) {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
    }
    chart.data.labels.push(now);
    chart.data.datasets[0].data.push(bpm);
    chart.update();

    // Enable Save
    saveBtn.disabled = false;
}

// Controls
startBtn.addEventListener('click', async () => {
    if (!isScanning) {
        await setupCamera();
        rppg.start(video, canvas, (bpm) => {
            updateDisplay(bpm);
        });
        startBtn.innerText = 'Stop Scan';
        startBtn.classList.replace('primary', 'secondary');
        isScanning = true;
    } else {
        rppg.stop();
        // Stop video tracks
        const stream = video.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        video.srcObject = null;

        startBtn.innerText = 'Start Scan';
        startBtn.classList.replace('secondary', 'primary');
        isScanning = false;
    }
});

saveBtn.addEventListener('click', async () => {
    if (currentBpm === 0) return;

    try {
        const res = await fetch(`${API_URL}/saveReading`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                bpm: currentBpm,
                stressLevel: currentStress
            })
        });

        if (res.ok) {
            alert('Reading Saved!');
            loadHistory();
        } else {
            alert('Failed to save.');
        }
    } catch (e) {
        console.error(e);
        alert('Error saving data.');
    }
});

refreshBtn.addEventListener('click', loadHistory);

async function loadHistory() {
    try {
        const res = await fetch(`${API_URL}/history`);
        const data = await res.json();

        historyTableBody.innerHTML = '';
        data.forEach(log => {
            const date = new Date(log.timestamp).toLocaleString();
            const row = `
                <tr>
                    <td>${date}</td>
                    <td>${log.bpm}</td>
                    <td><span class="badge ${getBadgeClass(log.stressLevel)}">${log.stressLevel}</span></td>
                </tr>
            `;
            historyTableBody.innerHTML += row;
        });
    } catch (e) {
        console.error('Failed to load history', e);
    }
}

// Initialize
initChart();
loadHistory();
