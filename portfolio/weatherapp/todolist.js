const taskList = document.getElementById("taskList")
const addBtn = document.getElementById("addBtn")
const taskInput = document.getElementById("taskInput")

let tasks = getFromLocal();
renderTasks();

taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addBtn.click();
    }
});

addBtn.addEventListener("click", (event) => {
    if (taskInput.value.trim() === "") {
        alert("please Enter the task.");
    }
    else {
        tasks.push({ text: taskInput.value, completed: false });
        renderTasks()
    }
    taskInput.value = "";

})

function renderTasks() {
    taskList.innerHTML = ""; // clear everything first

    tasks.forEach((task, index) => {
        const div = document.createElement("div");
        const li = document.createElement("li");
        const button = document.createElement("button");
        const checkbox = document.createElement("input");
        checkbox.type = 'checkbox';

        checkbox.checked = task.completed;
        li.textContent = task.text;
        button.textContent = "X";
        if (checkbox.checked) {
            li.style.textDecoration = "line-through";
        }
        else {
            li.style.textDecoration = "none"
        }
        button.addEventListener("click", () => {
            tasks.splice(index, 1);
            renderTasks();

        });
        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            renderTasks();
        })
        div.appendChild(checkbox);
        div.appendChild(li);
        div.appendChild(button);
        taskList.appendChild(div);

    });
    addToLocal()
}

function addToLocal() {
    localStorage.setItem("todoTask", JSON.stringify(tasks));

}
function getFromLocal() {
    let local = JSON.parse(localStorage.getItem("todoTask"));
    return local === null ? [] : local;
}
