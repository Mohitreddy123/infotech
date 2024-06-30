let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCounter = 1;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const laps = document.getElementById('laps');

function updateTime() {
  const now = Date.now();
  elapsedTime = now - startTime;

  const time = new Date(elapsedTime);
  const minutes = time.getUTCMinutes();
  const seconds = time.getUTCSeconds();
  const milliseconds = Math.floor(time.getUTCMilliseconds() / 10);

  display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
}

function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(updateTime, 10);
  startStopBtn.textContent = 'Stop';
  startStopBtn.classList.remove('start');
  startStopBtn.classList.add('stop');
}

function stop() {
  clearInterval(timerInterval);
  startStopBtn.textContent = 'Start';
  startStopBtn.classList.remove('stop');
  startStopBtn.classList.add('start');
}

function reset() {
  clearInterval(timerInterval);
  startTime = 0;
  elapsedTime = 0;
  display.textContent = '00:00:00.00';
  startStopBtn.textContent = 'Start';
  startStopBtn.classList.remove('stop');
  startStopBtn.classList.add('start');
  laps.innerHTML = '';
  lapCounter = 1;
  isRunning = false;
}

function lap() {
  if (!isRunning) return;
  const lapTime = document.createElement('li');
  lapTime.textContent = `Lap ${lapCounter}: ${display.textContent}`;
  laps.appendChild(lapTime);
  lapCounter++;
}

startStopBtn.addEventListener('click', function() {
  if (isRunning) {
    stop();
  } else {
    start();
  }
  isRunning = !isRunning;
});

lapBtn.addEventListener('click', lap);
resetBtn.addEventListener('click', reset);
