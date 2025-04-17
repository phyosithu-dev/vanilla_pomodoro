// Select all the necessary elements
const threeOptions = document.querySelectorAll(".option");
const startBtn = document.getElementById("start");
const minuteTime = document.getElementById("minutes");
const secondsTime = document.getElementById("seconds");
const forwardIcon = document.querySelector(".fa-forward");
const clickSound = document.getElementById("clickSound");
const cheerSound = document.getElementById("cheerSound");

// States
let pomodoro = 0;

let timer;
let isRunning = false;
let timeLeft = 25 * 60; // Default to 25 minutes in seconds

// Durations for each option (in minutes)
const durations = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
};

// Add event listeners to the options
threeOptions.forEach((option) => {
  option.addEventListener("click", () => {
    switchOption(option.id);
  });
});

// Function to switch options
function switchOption(optionId) {
  clearInterval(timer);
  isRunning = false;

  // Reset all options and set the active one
  threeOptions.forEach((opt) => opt.classList.remove("active"));
  document.getElementById(optionId).classList.add("active");

  // Update the background color and button text
  const bg = document.getElementById(optionId).dataset.bg;
  document.body.style.backgroundColor = bg;
  startBtn.style.color = bg;
  startBtn.innerText = "Start";
  forwardIcon.style.display = "none";

  // Reset the timer
  timeLeft = durations[optionId] * 60;
  updateDisplay();
}

// Function to handle transitions based on the Pomodoro algorithm
function handleTransition() {
  const activeOption = document.querySelector(".option.active");
  const id = activeOption.id;

  if (id === "pomodoro") {
    pomodoro++;

    if (pomodoro < 4) {
      switchOption("shortBreak");
    } else {
      switchOption("longBreak");
    }
  } else if (id === "shortBreak") {
    switchOption("pomodoro");
  } else if (id === "longBreak") {
    switchOption("pomodoro");
    pomodoro = 0; // Reset after long break
  }
}

// Function to update the timer display
function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  minuteTime.innerText = String(minutes).padStart(2, "0");
  secondsTime.innerText = String(seconds).padStart(2, "0");
}

// Add event listener to the start button
startBtn.addEventListener("click", () => {
  clickSound.currentTime = 0;
  clickSound.play();

  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    startBtn.innerText = "Start";
    forwardIcon.style.display = "none";
  } else {
    isRunning = true;
    startBtn.innerText = "Pause";
    forwardIcon.style.display = "block";

    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        cheerSound.currentTime = 0;
        cheerSound.play();
        clearInterval(timer);
        isRunning = false;
        handleTransition();
      }
    }, 1000);
  }
});

// Add event listener to the forward icon
forwardIcon.addEventListener("click", () => {
  clickSound.currentTime = 0;
  clickSound.play();
  handleTransition();
});
