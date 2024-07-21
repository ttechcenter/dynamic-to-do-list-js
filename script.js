document.addEventListener("DOMContentLoaded", function() {
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach(taskText => addTask(taskText, false));
  }

  function addTask(taskText, save = true) {
    const newTask = document.createElement("li");
    newTask.textContent = taskText;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-btn");

    removeButton.onclick = function() {
      taskList.removeChild(newTask);
      const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      const taskIndex = tasks.indexOf(taskText);
      tasks.splice(taskIndex, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    newTask.appendChild(removeButton);
    taskList.appendChild(newTask);

    if (save) {
      const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      tasks.push(taskText);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    taskInput.value = ""; // Clear input field after adding task
  }

  addButton.addEventListener("click", function() {
    addTask(taskInput.value.trim());
  });

  taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      addTask(taskInput.value.trim());
    }
  });

  loadTasks(); // Load tasks from Local Storage on page load
});
