let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapCount = 1;

const display = document.querySelector('.display');
const startPauseBtn = document.getElementById('startPause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function formatTime(ms) {
    let date = new Date(ms);
    let hours = date.getUTCHours().toString().padStart(2, '0');
    let minutes = date.getUTCMinutes().toString().padStart(2, '0');
    let seconds = date.getUTCSeconds().toString().padStart(2, '0');
    let milliseconds = Math.floor(date.getUTCMilliseconds() / 10).toString().padStart(2, '0');
    
    return `${hours}:${minutes}:${seconds}`;
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

function startTimer() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        isRunning = true;
        startPauseBtn.textContent = 'Pause';
        startPauseBtn.classList.add('running');
    } else {
        clearInterval(timer);
        isRunning = false;
        startPauseBtn.textContent = 'Start';
        startPauseBtn.classList.remove('running');
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    lapCount = 1;
    updateDisplay();
    startPauseBtn.textContent = 'Start';
    startPauseBtn.classList.remove('running');
    lapsList.innerHTML = '';
}

function recordLap() {
    if (isRunning) {
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCount++}: ${formatTime(elapsedTime)}`;
        lapsList.prepend(lapItem);
    }
}

startPauseBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);