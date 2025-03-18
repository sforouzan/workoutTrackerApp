// static/js/timer.js
document.addEventListener('DOMContentLoaded', () => {
    let timerInterval;
    let startTime;
    let runningTime = 0;
    let paused = true;
  
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
    const startButton = document.getElementById('startTimer');
    const pauseButton = document.getElementById('pauseTimer');
    const resetButton = document.getElementById('resetTimer');
  
    function displayTime() {
      const totalSeconds = Math.floor(runningTime / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
  
      minutesDisplay.textContent = String(minutes).padStart(2, '0');
      secondsDisplay.textContent = String(seconds).padStart(2, '0');
    }
  
    function startTimer() {
      if (paused) {
        paused = false;
        startTime = Date.now() - runningTime;
        timerInterval = setInterval(function() {
          runningTime = Date.now() - startTime;
          displayTime();
        }, 1000);
      }
    }
  
    function pauseTimer() {
      if (!paused) {
        paused = true;
        clearInterval(timerInterval);
      }
    }
  
    function resetTimer() {
      paused = true;
      clearInterval(timerInterval);
      runningTime = 0;
      displayTime();
    }
  
    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);
    resetButton.addEventListener('click', resetTimer);
  
    // Initial display
    displayTime();
  });