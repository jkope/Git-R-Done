let listNames = localStorage.getItem('names') ? JSON.parse(localStorage.getItem('names')) : [] ;
let taskList = localStorage.getItem('lists') ? JSON.parse(localStorage.getItem('lists')) : [] ;
let listNameInput = document.getElementById('newListName');
let headerTabs = document.getElementById('lists');
let listBtn = document.getElementById('newListBtn');
let pages = document.getElementById('taskList');
let hTabs = '';
let main = '';
let page = '';
let taskListHtml = '';

document.addEventListener("DOMContentLoaded", event => { 
    tabs(listNames,true)
    addTask(listNames.length-1, true)

});


function tabs(listNames, exclude) {
    hTabs = '';
    main = '';
    for (i = 0; i < listNames.length; i++) {
        hTabs +=
        `<a onclick='addTask(${i}, true)' class="list-group-item list-group-item-action ${i===listNames.length-1 ? 'active' : ''}" id="link-${i}" data-toggle="list" href="#l${i}"
                role="tab" aria-controls=""><span id='badge${i}' class="badge badge-primary badge-pill mybadge"></span>${listNames[i]}</a>`
                main +=
           `<div id="l${i}" class="tab-pane fade show ${i === listNames.length-1 ? 'show active' : ''}" role="tabpanel" aria-labelledby="list-home-list">
                <div class="center">
                    <h3>${listNames[i]}</h3>
                    <div id="task${i}"> 
                    <h5>Create a new task below.</h5>
                    <h5>After a task has been created you can edit the task by double clicking on it.</h5>
                    </div>
                    <form onsubmit="addTask(${i}); return false">
                      <input class="newTask" type="text" placeholder="New Task..." id="newTask${i}">
                    </form>
                    <button onclick="deleteList(${i})" class="deleteList">
                        Delete List
                    </button>
                </div>    
            </div>`;
    };
    headerTabs.innerHTML = hTabs;
    pages.innerHTML = main;
    exclude ? '' : taskList.push([]);
    localStorage.setItem('lists', JSON.stringify(taskList));
    badges();
}

document.getElementsByName('form')
function listReturn(evt) {
    (evt.keyCode === 13) ? NewList() : '';
}
listNameInput.addEventListener('keydown', listReturn);

function NewList(){
    listNames.push(listNameInput.value);
    localStorage.setItem('names', JSON.stringify(listNames));
    listNameInput.value = '';
    tabs(listNames, false);
}

function deleteTask(task, listnum, tasknum) {
    let line = document.getElementById(task);
    line.parentNode.removeChild(line);
    taskList[listnum].splice(tasknum, 1);
    localStorage.setItem('lists', JSON.stringify(taskList));
    document.getElementById('badge' + listnum).innerHTML = taskList[listnum].length;
    addTask(listnum, true);
}
function deleteList(i) {
    listNames.splice(i, 1);
    localStorage.setItem('names', JSON.stringify(listNames));
    taskList.splice(i, 1);
    localStorage.setItem('lists', JSON.stringify(taskList));
    tabs(listNames, true);
    addTask(listNames.length-1, true);
}

function addTask(listnum, exclude) {
    let newTaskId = 'newTask' + listnum;
    let input = document.getElementById(newTaskId).value;
    let task = {title: input, isChecked: false};
    exclude ? '' : (taskList[listnum]).push(task);
    localStorage.setItem('lists', JSON.stringify(taskList));
    document.getElementById(newTaskId).value = '';
    taskListHtml = '';
    button = '';
    for (let i = 0; i < taskList[listnum].length; i++) {
        
        taskListHtml +=
            `<div id='${i}' class="form-group form-check spread line">
                <input type="checkbox" class="form-check-input" onclick="swap(${listnum},${i})" id="check${listnum}-${i}" ${taskList[listnum][i].isChecked ? 'checked' : ''}>
                <div id="tasker${listnum}-${i}">
                <label class="form-check-label" onclick="edit(${listnum}, ${i})" for="check${i}">${taskList[listnum][i].title}</label>
                </div>
                <div>
                <i class="far fa-trash-alt" onclick='deleteTask(${i} ,${listnum}, ${i})'></i>
                </div>
            </div>`;
    if(taskList[listnum][i].isChecked){
        button = `<button onclick="clearChecked(${listnum})" class="deletemulti">
                        Clear all Checked Tasks
                    </button>`
        }
    }
    document.getElementById('task'+listnum).innerHTML = taskListHtml+button;
    badges();
};

function edit(listnum, i){
    document.getElementById('tasker'+listnum+'-'+i).innerHTML =
    `<form onsubmit="editTask(${listnum}, ${i}); return false">
        <input  id="edit${listnum}-${i}" class="newTask" type="text" value="${taskList[listnum][i].title}">
    </form>`

}
function editTask(listnum,i){
    let newTitle = document.getElementById('edit'+listnum+'-'+i).value;
    taskList[listnum][i].title = newTitle;
    localStorage.setItem('lists', JSON.stringify(taskList));
    addTask(listnum, true)
};

function swap(listnum,i){
    taskList[listnum][i].isChecked ? taskList[listnum][i].isChecked = false : taskList[listnum][i].isChecked = true;
    localStorage.setItem('lists', JSON.stringify(taskList));
    addTask(listnum, true);
};

function badges(){
  for (let i=0; i<listNames.length; i++ ){
    document.getElementById('badge' + i).innerHTML = taskList[i].length;
    }
};

function clearChecked(listnum){
    for (let i =0;i<taskList[listnum].length; i++){
        if (taskList[listnum][i].isChecked){
            let line = document.getElementById(i);
            line.parentNode.removeChild(line);
            taskList[listnum].splice(i, 1);
            localStorage.setItem('lists', JSON.stringify(taskList));
            document.getElementById('badge' + listnum).innerHTML = taskList[listnum].length;
        } else{
            '';
        }
    }
    addTask(listnum, true);
}