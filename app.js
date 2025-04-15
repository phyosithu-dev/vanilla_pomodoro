//select all the necessary elements
const threeOptions = document.querySelectorAll(".option");
const startBtn = document.getElementById("start");
const minuteTime = document.getElementById("minutes");
const secondsTime = document.getElementById("seconds");
const pauseIcon = document.querySelector(".fa-circle-pause");
const clickSound = document.getElementById("clickSound");
const cheerSound = document.getElementById("cheerSound");

//set the timer
let timer;
//set the isRunning variable
let isRunning = false;
//set the timeLeft
let timeLeft = 25 * 60; // 25 minutes in seconds as default
//add event listeners to the options
threeOptions.forEach((option) => {
  option.addEventListener("click", () => {
    clearInterval(timer);
    isRunning = false;
    threeOptions.forEach((opt) => opt.classList.remove("active"));
    option.classList.add("active");
    const bg = option.dataset.bg;
    //change the color of the body
    document.body.style.backgroundColor = bg;
    //change the button text to start
    startBtn.innerText = "Start";
    //change the minutes and seconds
    minuteTime.innerText = option.dataset.minutes;
    //change the color of button
    startBtn.style.color = bg;
    //change the minutes and seconds
    minuteTime.innerText = option.dataset.minutes;
    // convert minutes to seconds
    timeLeft = option.dataset.minutes * 60;
    updateDisplay();
  });
});

//define the updateDisplay function
function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById("minutes").innerText = String(minutes).padStart(
    2,
    "0"
  );
  document.getElementById("seconds").innerText = String(seconds).padStart(
    2,
    "0"
  );
}
//add event listener to the start button
startBtn.addEventListener("click", () => {
  //play the click sound
  clickSound.currentTime = 0;
  clickSound.play();
  //if it is running, stop the timer
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    startBtn.innerText = "Start";
    pauseIcon.style.display = "none";
    return;
  } else {
    isRunning = true;
    //if it is not running, start the timer
    startBtn.innerText = "Pause";
    pauseIcon.style.display = "block";
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        cheerSound.currentTime = 0;
        cheerSound.play();

        // Reset everything to the normal state
        clearInterval(timer);
        isRunning = false;
        startBtn.innerText = "Start"; // Reset button text
        pauseIcon.style.display = "none"; // Hide the pause icon

        // Get the default time for the currently active option
        const activeOption = document.querySelector(".option.active");
        const defaultMinutes = activeOption.dataset.minutes;
        timeLeft = defaultMinutes * 60; // Reset timeLeft to the default time
        updateDisplay(); // Update the display to show the default time

        alert("Time's up!"); // Optional: Notify the use
      }
    }, 1000);
  }
});
