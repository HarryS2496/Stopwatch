let isRunning = false;
let startTime;
let updatedTime;
let elapsedTime = 0;
let totalElapsedTime = 0;
let timerInterval;

const stopwatchDisplay = document.getElementById("stopwatch");
const totalTimeDisplay = document.getElementById("totalTime"); 
const startStopButton = document.getElementById("startStopButton");
const resetButton = document.getElementById("resetButton");
const lapButton = document.getElementById("lapButton");
const lapsContainer = document.getElementById("laps");

// Starts and stops timer
function toggleTimer() {
    if (isRunning) {
        // Stop the timer
        clearInterval(timerInterval);
        startStopButton.textContent = "Start";
        startStopButton.classList.remove("stop-btn");
        startStopButton.classList.add("start-btn");
    } else {
        // Start the timer
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10); // Update every 10ms for milliseconds
        startStopButton.textContent = "Stop";
        startStopButton.classList.remove("start-btn");
        startStopButton.classList.add("stop-btn");
    }
    isRunning = !isRunning;
}

// Bookmarks times and lists them as laps
function recordLap() {
    if (!isRunning) return;

    const lapTime = stopwatchDisplay.textContent; // Get current stopwatch time
    const lapMilliseconds = elapsedTime; // Get lap time in milliseconds
    totalElapsedTime += lapMilliseconds; // Add lap time to total time

    // Record the lap
    const lapElement = document.createElement("div");
    lapElement.textContent = `LAP ${lapsContainer.children.length + 1} : ${lapTime}`;
    lapsContainer.appendChild(lapElement);

    updateTotalTimeDisplay(); // Update total time display

    // Resets timer display, but time keeps running
    elapsedTime = 0; 
    stopwatchDisplay.textContent = "00:00:00.000"; 
    startTime = Date.now(); 
}

// Resets timer
function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    totalElapsedTime = 0;
    stopwatchDisplay.textContent = "00:00:00.000";
    totalTimeDisplay.textContent = "Total Time: 00:00:00.000";
    startStopButton.textContent = "Start";
    startStopButton.classList.remove("stop-btn");
    lapsContainer.textContent = "";
}

// Displays the elapsed time
function updateTime() {
    updatedTime = Date.now();
    elapsedTime = updatedTime - startTime;
    
    const hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);

    stopwatchDisplay.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}.${formatMilliseconds(milliseconds)}`;
}

// Updates the total time display
function updateTotalTimeDisplay() {
    const hours = Math.floor((totalElapsedTime / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((totalElapsedTime / (1000 * 60)) % 60);
    const seconds = Math.floor((totalElapsedTime / 1000) % 60);
    const milliseconds = Math.floor((totalElapsedTime % 1000) / 10);

    totalTimeDisplay.textContent = `Total Time: ${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}.${formatMilliseconds(milliseconds)}`;
}

// Makes sure all units of time come in double digits
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// Except milliseconds, those come in triple digits
function formatMilliseconds(time) {
    return time < 10 ? `00${time}` : time < 100 ? `0${time}` : time;
}