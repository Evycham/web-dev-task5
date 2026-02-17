"use strict";


const btnOpen = document.getElementById("btnOpen");
const btnClose = document.getElementById("btnClose");
const btnCreate = document.getElementById("btnCreate");
const dialog = document.getElementById("dialog");
const nameInput = document.getElementById("name--input");
const descriptionInput = document.getElementById("description--input");
const dateInput = document.getElementById("date--input");
const tasksList = document.getElementsByClassName("tasks-task");

let tasksArray = [];

// Dialog-open
btnOpen.addEventListener("click", function() {
    dialog.showModal();
});
// Dialog-close
btnClose.addEventListener("click", function() {
    dialog.close();
})

btnCreate.addEventListener("click", createTask);

function createTask() {
    const dateToday = Date.now();

    let name = nameInput.value;
    let description = descriptionInput.value;
    let date = dateInput.value;

    let day = date.getDay();
    let month = date.getMonth();
    let year = date.getFullYear();
    let hour = date.getHours();

    if(dateToday.getFullYear() > year){
        // fehler zeigen
    } else if(dateToday.getMonth() > month){
        // fehler
    } else if(dateToday.getDate() > day){
        // fehler
    } else if(dateToday.getHours() > hour){
        // fehler
    }

    let task = new Task(name, description, date);
    taskList.push(task);
}

class Task{
    constructor(_name, _description, _date) {
        this.name = _name;
        this.description = _description;
        this.date = _date;
    }
}

function updateList(){
    let allTasks = Array.from(tasksList);

    allTasks.forEach(task => {
        task.remove();
    });

    for(let obj of tasksList){

    }
}

