let startTime;
let elapsedTime = 0;
let timerInterval;
let lapCounter = 1;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "0");
    let formattedHH = hh.toString().padStart(2, "0");

    return `${formattedHH}:${formattedMM}:${formattedSS}<span class="ms">.${formattedMS}</span>`;
}

function startStop() {
    if (startStopBtn.innerText === "Start") {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(function printTime() {
            elapsedTime = Date.now() - startTime;
            display.innerHTML = timeToString(elapsedTime);
        }, 10);
        showButton("STOP");
        lapBtn.disabled = false;
    } else {
        clearInterval(timerInterval);
        showButton("START");
    }
}

function reset() {
    clearInterval(timerInterval);
    display.innerHTML = "00:00:00<span class=\"ms\">.00</span>";
    elapsedTime = 0;
    lapCounter = 1;
    lapsList.innerHTML = "";
    showButton("START");
    lapBtn.disabled = true;
}

function recordLap() {
    let li = document.createElement("li");
    li.innerHTML = `<span class="lap-num">Lap ${lapCounter}</span> <span>${timeToString(elapsedTime)}</span>`;
    lapsList.prepend(li);
    lapCounter++;
}

function showButton(buttonKey) {
    if (buttonKey === "STOP") {
        startStopBtn.innerText = "Stop";
        startStopBtn.style.background = "#fbbf24"; // Amber color
    } else {
        startStopBtn.innerText = "Start";
        startStopBtn.style.background = "#3b82f6"; // Blue color
    }
}