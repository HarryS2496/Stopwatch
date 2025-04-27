let isRunning = false;
let startTime;
let updatedTime;
let elapsedTime = 0;
let timerInterval;

const stopwatchDisplay = document.getElementById("stopwatch");
const startStopButton = document.getElementById("startStopButton");

// Starts and stops timer
function toggleTimer() {
    if (isRunning) {
        // Stop the timer
        clearInterval(timerInterval);
        startStopButton.textContent = "Start";
        startStopButton.classList.remove("stop-btn");
        
    } else {
        // Start the timer
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10); // Update every 10ms for milliseconds
        startStopButton.textContent = "Stop";
        startStopButton.classList.add("stop-btn");
    }
    isRunning = !isRunning;
}

function updateTime() {
    updatedTime = Date.now();
    elapsedTime = updatedTime - startTime;
    
    const hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);

    stopwatchDisplay.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds)}`;
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}