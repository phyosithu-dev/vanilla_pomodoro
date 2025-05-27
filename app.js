// Select all the necessary elements
const threeOptions = document.querySelectorAll(".option");
const startBtn = document.getElementById("start");
const minuteTime = document.getElementById("minutes");
const secondsTime = document.getElementById("seconds");
const forwardIcon = document.querySelector(".fa-forward");
const clickSound = document.getElementById("clickSound");
const cheerSound = document.getElementById("cheerSound");
const focusTimes = document.getElementById("focusTimes");
const focusStatus = document.getElementById("focusStatus");
const increment = document.getElementById("increment");
const decrement = document.getElementById("decrement");
const pomodoroCount = document.getElementById("pomodoroCount");
const addTask = document.querySelector(".addTask");
const taskDiv = document.querySelector(".task");
const buttonsContainer = document.querySelector(".buttonsContainer");
const cancelBtn = document.getElementById("cancelBtn");
const saveBtn = document.getElementById("saveBtn");
const taskInput = document.getElementById("taskInput");
const taskNote = document.getElementById("note");
const addNotes = document.querySelector(".addNotes");
const noteArea = document.querySelector("textarea");
const taskLine = document.querySelector(".taskLine");

// States
let pomodoro = 0;
let totalCount = 1;

let timer;
let isRunning = false;
let timeLeft = 25 * 60; // Default to 25 minutes in seconds

// Durations for each option (in minutes)
const durations = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
};

//reset values when the page is refreshed
window.onload = () => {
  //reset the input fields values
  taskInput.value = "";
  taskNote.value = "";
  
};
//add the evnet listener to the save button
saveBtn.addEventListener("click", () => {
  //get the value of the task input
  const taskTitle = taskInput.value.trim();
  //get the value of note input
  const noteTitle = taskNote.value.trim();
  console.log(pomodoroCount.innerText);
  if (taskTitle) {
    //create a new div element
    const newTask = document.createElement("div");
    //addd the class task to the new div
    newTask.classList.add("createTask");
    //create a new div element called taskHeader
    const taskHeader = document.createElement("div");
    //addd the class taskHeader to the new div
    taskHeader.classList.add("taskHeader");
    //create a new div element
    const titleDiv = document.createElement("div");
    //addd the class title to the new div
    titleDiv.classList.add("titleDiv");
    //add the icon to the new div
    titleDiv.innerHTML = `<i class="fa-solid fa-circle-check checkIcon"></i>`;
    //add the task title to the new div
    titleDiv.innerHTML += `<div class="title">${taskTitle}</div>`;
    //add the titleDiv to the new task
    taskHeader.appendChild(titleDiv);
    //create a new div element called count & edit
    const editDiv = document.createElement("div");
    //addd the class edit to the new div
    editDiv.classList.add("edit");
    //add the pomodoro count to the new div
    editDiv.innerHTML += `<span class="count">0 / ${pomodoroCount.innerText}</span>`;
    //crate a icon element
    editDiv.innerHTML += `<i class="fa-solid fa-bars"></i>`;
    //add the hamburgermenu to the new task
    taskHeader.appendChild(editDiv);
    //add the taskHeader to the new task
    newTask.appendChild(taskHeader);
    if (noteTitle) {
      //create a new div element
      const newNote = document.createElement("div");
      //addd the class note to the new div
      newNote.classList.add("note");
      //add the value of the note input to the new div
      newNote.innerHTML = `<span>${noteTitle}</span>`;
      //add the new Note to the new Task
      newTask.appendChild(newNote);
    }
    //insert the new task before the taskLine div
    taskLine.parentNode.insertBefore(newTask, taskLine.nextSibling);
  }
  //reset all the values in task class div
  taskInput.value = "";
  taskNote.value = "";
  pomodoroCount.innerText = 0;
});

//add the event listener to the cancel button
cancelBtn.addEventListener("click", () => {
  //set the selected div display to none
  taskDiv.style.display = "none";
  //set the buttonsContainer display to none
  buttonsContainer.style.display = "none";
  //set the addTask display to flex
  addTask.style.display = "flex";
});

//add the event listener to the addTask div
addTask.addEventListener("click", () => {
  //set the selected div display to flex
  taskDiv.style.display = "flex";
  //set the buttonsContainer display to none
  buttonsContainer.style.display = "flex";
  //set the addTask display to none
  addTask.style.display = "none";
});
//add the addNotes event listener
addNotes.addEventListener("click", () => {
  //set the addNotes div display to flex
  noteArea.style.display = "flex";
  //set the addNotes display to none
  addNotes.style.display = "none";
});
// add the event listeners to the increment and decrement buttons
increment.addEventListener("click", () => {
  clickSound.currentTime = 0;
  clickSound.play();
  pomodoroCount.innerText = Number(pomodoroCount.innerText) + 1;
});

decrement.addEventListener("click", () => {
  clickSound.currentTime = 0;
  clickSound.play();
  if (Number(pomodoroCount.innerText) > 1) {
    pomodoroCount.innerText = Number(pomodoroCount.innerText) - 1;
  } else {
    alert("Pomodoro count cannot be less than 1.");
  }
});
//add event listeners to the focusTimes
focusTimes.addEventListener("click", () => {
  let result = confirm("Do you want to rest the pomodoro count?");
  if (result) {
    pomodoro = 0;
    totalCount = 1;
    focusTimes.innerText = `#${totalCount}`;
  }
});

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
  console.log(focusStatus);

  if (id === "pomodoro") {
    pomodoro++;
    totalCount++;

    if (pomodoro < 4) {
      switchOption("shortBreak");
      focusStatus.innerText = "Time for a break!";
      focusTimes.innerText = `#${(totalCount -= 1)}`;
    } else {
      switchOption("longBreak");
      focusStatus.innerText = "Time for a break!";
      focusTimes.innerText = `#${(totalCount -= 1)}`;
    }
  } else if (id === "shortBreak") {
    totalCount++;
    switchOption("pomodoro");
    focusStatus.innerText = "Time to focus!";
    focusTimes.innerText = `#${totalCount}`;
  } else if (id === "longBreak") {
    totalCount++;
    switchOption("pomodoro");
    focusStatus.innerText = "Time to focus!";
    focusTimes.innerText = `#${totalCount}`;
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
