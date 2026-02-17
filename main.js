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
    dialog.close();
    clearInput();
});

form.addEventListener("submit", createTask);

tasksList.addEventListener("click", removeTask);

/**
 * Main function for creating Tasks:
 *  gathering information from inputs fields and pre-check
 *
 * @param e turn off standard acting
 **/
function createTask(e) {
    e.preventDefault();

    const dateToday = new Date();
    dateToday.setHours(0, 0, 0, 0);

    const name = titelInput.value;
    const description = descriptionInput.value;
    const date = new Date(dateInput.value);
    const createdAt = dateToday;

    if(dateToday > date){
        showError();
        return;
    }

    let task = new Task(name, description, date, createdAt);
    tasksArray.push(task);

    task.addTask();
    clearInput();
    dialog.close();
}

/**
 * class for a Task
 **/
class Task{
    constructor(_title, _description, _date, _createAt) {
        this.title = _title;
        this.description = _description;
        this.date = _date;
        this.createdAt = _createAt;
        this.id = crypto.randomUUID();
    }

    /**
     * method for adding the task to the HTML "part"
     **/
    addTask() {
        const clone = template.content.cloneNode(true);
        const title = clone.querySelector(".task--title");
        const description = clone.querySelector(".task--description");
        const date = clone.querySelector(".task--deadline");
        const fullEl = clone.querySelector(".task--details");

        fullEl.dataset.id = this.id;
        title.textContent = this.title;
        description.textContent = this.description;
        date.textContent = this.dateToString();

        if(this.date - this.createdAt <= 2 * 24 * 60 * 60 * 1000){
            fullEl.classList.add("isImportant");
        }

        tasksList.appendChild(clone);
    }

    dateToString() {
        let year = this.date.getFullYear();
        let month = ("" + this.date.getMonth() + 1).padStart(2, "0");
        let day = ("" + this.date.getDate()).padStart(2, "0");

        return day + "-" + month + "-" + year;
    }
}

/**
* two methods for the date-error
**/
function showError(){
    errorMsg.classList.add("error--On");
}

function hideError(){
    errorMsg.classList.remove("error--On");
}

/**
 * input fields clearing
 **/
function clearInput(){
    titelInput.value = "";
    descriptionInput.value = "";
    dateInput.value = "";
    hideError();
}

/**
 * according to the event - looking for the element on which it was clicked, if btn "remove" -> delete
 * El and also drop from the Array
 * @param e - event
 **/
function removeTask(e){
    const btn = e.target.closest(".remove");
    if(!btn) return;

    const dropTask = btn.closest(".task--details");
    if(!dropTask) return;

    const id = dropTask.dataset.id;
    tasksArray.splice(tasksArray.findIndex(task => task.id === id), 1);

    dropTask.remove();
}

function updateTasks(){

}