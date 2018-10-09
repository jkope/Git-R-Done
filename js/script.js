let listNames = [];
let taskList = [];
let listNameInput = document.getElementById('newListName');
let headerTabs = document.getElementById('lists');
let listBtn = document.getElementById('newListBtn');
let pages = document.getElementById('taskList');
let hTabs = '';
let main = '';
let page = '';
let taskListHtml = '';


function tabs(listNames, exclude) {
    hTabs = '';
    main = '';
    for (i = 0; i < listNames.length; i++) {
        hTabs +=
        `<a onclick='addTask(${i}, true)' class="list-group-item list-group-item-action ${i===listNames.length-1 ? 'active' : ''}" id="link-${i}" data-toggle="list" href="#l${i}"
                role="tab" aria-controls=""><span id='badge${i}' class="badge badge-primary badge-pill pad"></span>${listNames[i]}</a>`
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
    badges();
}

document.getElementsByName('form')
function listReturn(evt) {
    (evt.keyCode === 13) ? NewList() : '';
}
listNameInput.addEventListener('keydown', listReturn);

function NewList(){
    listNames.push(listNameInput.value);
    listNameInput.value = '';
    tabs(listNames, false);
}

function deleteTask(task, listnum, tasknum) {
    let line = document.getElementById(task);
    line.parentNode.removeChild(line);
    taskList[listnum].splice(tasknum, 1);
    document.getElementById('badge' + listnum).innerHTML = taskList[listnum].length;
}
function deleteList(i) {
    listNames.splice(i, 1);
    taskList.splice(i, 1);
    tabs(listNames, true);
    addTask(listNames.length-1, true);
}

function addTask(listnum, exclude) {
    let newTaskId = 'newTask' + listnum;
    let input = document.getElementById(newTaskId).value;
    let task = {title: input, isChecked: false};
    exclude ? '' : (taskList[listnum]).push(task);
    document.getElementById(newTaskId).value = '';
    taskListHtml = '';
    for (let i = 0; i < taskList[listnum].length; i++) {
        
        taskListHtml +=
            `<div id='${i}' class="form-group form-check spread line">
                <input type="checkbox" class="form-check-input" onclick="swap(${listnum},${i})" id="check${listnum}-${i}" ${taskList[listnum][i].isChecked ? 'checked' : ''}>
                <div id="tasker${i}">
                <label class="form-check-label" onclick="edit(${listnum}, ${i})" for="check${i}">${taskList[listnum][i].title}</label>
                </div>
                <div>
                <i class="far fa-trash-alt" onclick='deleteTask(${i} ,${listnum}, ${i})'></i>
                </div>
            </div>`;
    }
    document.getElementById('task'+listnum).innerHTML = taskListHtml;
    badges();
};

function edit(listnum, i){
    document.getElementById('tasker'+i).innerHTML =
    `<form onsubmit="editTask(${listnum}, ${i}); return false">
        <input  id="edit" class="newTask" type="text" value="${taskList[listnum][i].title}">
    </form>`

}
function editTask(listnum,i){
    let newTitle = document.getElementById('edit').value;
    taskList[listnum][i].title = newTitle;
    addTask(listnum, true)
};

function swap(listnum,i){
    taskList[listnum][i].isChecked ? taskList[listnum][i].isChecked = false : taskList[listnum][i].isChecked = true;
};

function badges(){
  for (let i=0; i<listNames.length; i++ ){
    document.getElementById('badge' + i).innerHTML = taskList[i].length;
    }
};