let earningText;
let timerText;
let start;
let stop;
let clear;
let seconds, minutes, hours;
let isActive;
let hourlyWage;
let tick;
let tickRate;
let tickCount;
let loop;

function init() {
    isActive = false;
    tick = 0; tickCount = 0; tickRate = 20;
    seconds = 0; minutes = 0; hours = 0;

    start = document.getElementById('start');
    stop = document.getElementById('stop');
    clear = document.getElementById('clear');
    timerText = document.getElementById('timerText');
    earningText = document.getElementById('earningsText');
}

function timer() {
    loop = setTimeout(tickLoop, (1000 / tickRate));
    isActive = true;
}

// Main loop
function tickLoop() {
    tick++;
    tickCount++;

    if (tick === (tickRate - 1)) {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
        }
        displayTimer(seconds, minutes, hours);
        tick = 0;
    }

    displayEarnings(hourlyWage, tickCount)

    timer();
}

/* Realtime stopwatch display  */
function displayTimer(sec, min, hour) {
    if (hour) {
        if (hour > 9) {
            timerText.textContent = hour;
        } else {
            if (min) {
                if ("0" + hour + ":" + min > 9) {
                    timerText.textContent = min;
                } else {
                    if (sec > 9) {
                        timerText.textContent = "0" + min + ":" + sec;
                    } else {
                        timerText.textContent = "0" + min + ":" + "0" + sec;
                    }
                }
            } else {
                if (sec > 9) {
                    timerText.textContent = "0" + hour + ":" + "00" + ":" + sec;
                } else {
                    timerText.textContent = "0" + hour + ":" + "00" + ":" + "0" + sec;
                }
            }
        }
    } else {
        if (min > 9) {
            if (min) {
                timerText.textContent = "00" + ":" + min + ":" + (sec > 9 ? sec : "0" + sec);
            } else {
                timerText.textContent = "00" + ":" + "00" + ":" + (sec > 9 ? sec : "0" + sec);
            }
        } else {
            if (min) {
                timerText.textContent = "00" + ":" + "0" + min + ":" + (sec > 9 ? sec : "0" + sec);
            } else {
                timerText.textContent = "00" + ":" + "00" + ":" + (sec > 9 ? sec : "0" + sec);
            }
        }
    }
}

/* Realtime earnings display  */
function displayEarnings(hourlyWage, ticks) {
    earningText.textContent = getRealtimeEarnings(hourlyWage, ticks) + "kr";
}

function getRealtimeEarnings(hourlyWage, ticks) {
    return (((hourlyWage / 60) / 60) * (ticks / tickRate)).toFixed(2);
}

/* Start button */
function startButton() {
    if (isActive === false) {
        hourlyWage = Number(document.getElementById('hourlyWageInput').value);
        timer();
    }
}

/* Stop button */
function stopButton() {
    if (isActive) {
        clearTimeout(loop);
        isActive = false;
    }
}

/* Clear button */
function clearButton() {
    timerText.textContent = "00:00:00";
    earningText.textContent = "0.00kr";
    tick = 0; tickCount = 0;
    seconds = 0; minutes = 0; hours = 0;

}