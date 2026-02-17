"use strict";


const btnOpen = document.getElementById("btnOpen");
const btnClose = document.getElementById("btnClose");

const dialog = document.getElementById("dialog");
const form = document.getElementById("form");

const titelInput = document.getElementById("titel--input");
const descriptionInput = document.getElementById("description--input");
const dateInput = document.getElementById("date--input");

const tasksList = document.getElementById("tasks--list");
const errorMsg = document.getElementById("error");
const template = document.getElementById("tasks--template");


let tasksArray = [];

// Dialog-open
btnOpen.addEventListener("click", function() {
    clearInput();
    dialog.showModal();
});
// Dialog-close
btnClose.addEventListener("click", function() {
    clearInput();
    dialog.close();
});

form.addEventListener("submit", createTask);

function createTask(e) {
    e.preventDefault();

    const dateToday = new Date();
    dateToday.setHours(0, 0, 0, 0);

    const name = titelInput.value;
    const description = descriptionInput.value;
    const date = new Date(dateInput.value);

    if(dateToday > date){
        showError();
        return;
    }

    let task = new Task(name, description, date);
    tasksArray.push(task);

    task.addTask();
    hideError();
}

class Task{
    constructor(_title, _description, _date) {
        this.title = _title;
        this.description = _description;
        this.date = _date;
    }

    addTask() {
        const clone = template.content.cloneNode(true);
        const title = clone.querySelector(".task--title");
        const description = clone.querySelector(".task--description");
        const date = clone.querySelector(".task--deadline");

        title.textContent = this.title;
        description.textContent = this.description;
        date.textContent = this.date;

        tasksList.appendChild(clone);
    }
}

function showError(){
    errorMsg.classList.add("error--On");
}

function hideError(){
    errorMsg.classList.remove("error--On");
}

function clearInput(){
    titelInput.value = null;
    descriptionInput.value = null;
    dateInput.value = null;
    dialog.close();
}
