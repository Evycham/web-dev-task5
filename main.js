"use strict";


const btnOpen = document.getElementById("btnOpen");
const btnClose = document.getElementById("btnClose");
const btnCreate = document.getElementById("btnCreate");
const dialog = document.getElementById("dialog");
const form = document.getElementById("form");
const titelInput = document.getElementById("titel--input");
const descriptionInput = document.getElementById("description--input");
const dateInput = document.getElementById("date--input");
const tasksList = document.getElementById("tasks--list");
const errorMsg = document.getElementById("error");


let tasksArray = [];

// Dialog-open
btnOpen.addEventListener("click", function() {
    dialog.showModal();
});
// Dialog-close
btnClose.addEventListener("click", function() {
    dialog.close();
});

form.addEventListener("submit", createTask);

function createTask(e) {
    e.preventDefault();

    const dateToday = new Date();

    const name = titelInput.value;
    const description = descriptionInput.value;
    const date = new Date(dateInput.value);

    let day = date.getDay();

    if(dateToday <= date){
        showError();
        return;
    }

    let task = new Task(name, description, date);
    tasksArray.push(task);
    updateList();
}

class Task{
    constructor(_name, _description, _date) {
        this.name = _name;
        this.description = _description;
        this.date = _date;
    }
}

function updateList(){
    let allTasks = Array.from(tasksList.getElementsByTagName("li"));

    allTasks.forEach(task => {
        task.remove();
    });

    for(let obj of tasksArray){

    }
}

function showError(){
    errorMsg.classList.add("errorOn");
}

function hideError(){
    errorMsg.classList.remove("errorOn");
}

