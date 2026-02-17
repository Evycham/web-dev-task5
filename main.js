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

function createTask() {
    const dateToday = new Date(Date.now());

    let name = titelInput.value;
    let description = descriptionInput.value;
    let date = new Date(dateInput.value);

    let day = date.getDay();
    let month = date.getMonth();
    let year = date.getFullYear();

    if(dateToday.getFullYear() > year){
        showError();
        return;
    } else if(dateToday.getFullYear() === year && dateToday.getMonth() > month){
        showError();
        return;
    } else if(dateToday.getMonth() === month && dateToday.getDate() > day){
        showError();
        return;
    }

    let task = new Task(name, description, date);
    tasksArray.push(task);
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

