let tasks = [];

function addTask() {
    const taskInput = document.querySelector("#taskInput");
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        tasks.push({ text: taskText, completed: false });
        editTasks();
        taskInput.value = "";
    }
}

function editTasks() {
    const taskList = document.querySelector("#taskList");
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => {
            tasks[index].completed = checkbox.checked;
            editTasks();
        });
        const text = document.createElement("span");
        text.textContent = task.text;
        if (task.completed) {
            text.style.textDecoration = "line-through";
        }
        const deleteButton = document.createElement("span");
        deleteButton.classList.add("delete");
        deleteButton.textContent = "❌";
        deleteButton.addEventListener("click", () => {
            tasks.splice(index, 1);
            editTasks();
        });
        taskElement.appendChild(checkbox);
        taskElement.appendChild(text);
        taskElement.appendChild(deleteButton);
        taskList.appendChild(taskElement);
    });
    updateItemsLeft();
}

function showAll() {
    editTasks();
}

function showCompleted() {
    const completedTasks = tasks.filter(task => task.completed);
    renderFilteredTasks(completedTasks);
}

function showActive() {
    const activeTasks = tasks.filter(task => !task.completed);
    renderFilteredTasks(activeTasks);
}

function renderFilteredTasks(filteredTasks) {
    const taskList = document.querySelector("#taskList");
    taskList.innerHTML = "";
    filteredTasks.forEach((task, index) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => {
            tasks[index].completed = checkbox.checked;
            renderFilteredTasks(filteredTasks);
        });
        const text = document.createElement("span");
        text.textContent = task.text;
        if (task.completed) {
            text.style.textDecoration = "line-through";
        }
        const deleteButton = document.createElement("span");
        deleteButton.classList.add("delete");
        deleteButton.textContent = "❌";
        deleteButton.addEventListener("click", () => {
            tasks.splice(tasks.indexOf(task), 1);
            renderFilteredTasks(filteredTasks);
        });
        taskElement.appendChild(checkbox);
        taskElement.appendChild(text);
        taskElement.appendChild(deleteButton);
        taskList.appendChild(taskElement);
    });
    updateItemsLeft();
}

function clearCompleted() {
    tasks = tasks.filter(task => !task.completed);
    editTasks();
}

function updateItemsLeft() {
    const itemsLeft = document.querySelector("#itemsLeft");
    const count = tasks.filter(task => !task.completed).length;
    itemsLeft.textContent = `${count} items left`;
}

window.onload = function () {
    addTask();
};
