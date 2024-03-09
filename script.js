const inputElement = document.getElementById("task");
const timeElement = document.getElementById("time");
const remarksElement = document.getElementById("remarks");
const buttonElement = document.getElementById("add");
const containerElement = document.getElementById("container");

document.addEventListener("DOMContentLoaded", () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => renderTodoList(task.text, task.time, task.remarks, task.clicked));
});

buttonElement.addEventListener('click', () => {
  const text = inputElement.value;
  const time = timeElement.value;
  const remarks = remarksElement.value;

  renderTodoList(text, time, remarks);

  saveTasksToLocalStorage(text, time, remarks, false);

  inputElement.value = '';
  timeElement.value = '';
  remarksElement.value = '';
});

containerElement.addEventListener("click", (event) => {
  if (event.target.classList.contains('dlt-btn')) {
    event.target.parentNode.remove();
    removeFromLocalStorage(event.target.parentNode);
  } else if(event.target.classList.contains('terms')) {
    const taskNode = event.target.parentNode;
    const taskText = taskNode.querySelector('span').innerText;
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskIndex = tasks.findIndex(task => task.text === taskText);
    tasks[taskIndex].clicked = !tasks[taskIndex].clicked;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskNode.classList.toggle('clicked');
  }
});

function renderTodoList(text, time, remarks, clicked) {
  const taskHTML = `<div class="tasks my-1 py-2 px-2 text-light fw-bold d-flex justify-content-between">
  <span class="terms">${text}</span><span class="terms"> ${time}</span><span class="terms">${remarks}</span><span class="dlt-btn">&Cross;</span>
  </div>`;
  if (clicked) {
    containerElement.innerHTML += taskHTML;
    containerElement.lastChild.classList.add('clicked');
  } else {
    containerElement.innerHTML += taskHTML;
  }
}

function saveTasksToLocalStorage(text, time, remarks, clicked) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text, time, remarks, clicked });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeFromLocalStorage(taskNode) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskText = taskNode.querySelector('span').innerText;
  const updatedTasks = tasks.filter(task => task.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}
