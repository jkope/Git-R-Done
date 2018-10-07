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
                    </div>
                    <div>
                        <input class="newTask" type="text" placeholder="New Task..." id="newTask${i}">
                    </div>
                        <button onclick="addTask('${i}')">
                            ADD
                        </button>
                    <button onclick="deleteList('${i}')" class="deleteList">
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
// function taskReturn(evt) {
//     (evt.keyCode === 13) ? addTask(/*I need to pass the id from the parent div*/) : '';
// }
// listNameInput.addEventListener('keydown', taskReturn);

function addTask(listnum, exclude) {
    let newTaskId = 'newTask' + listnum;
    let input = document.getElementById(newTaskId).value;
    exclude ? '' : (taskList[listnum]).push(input);
    document.getElementById(newTaskId).value = '';
    taskListHtml = '';
    for (let i = 0; i < taskList[listnum].length; i++) {
        
        taskListHtml +=
            `<div id='${i}' class="form-group form-check spread line">
                <input type="checkbox" class="form-check-input" value='' id="check${listnum}-${i}">
                <label class="form-check-label" for="check${i}">${taskList[listnum][i]}</label>
                <div>
                <i class="far fa-trash-alt" onclick='deleteTask(${i} ,${listnum}, ${i})'></i>
                </div>
            </div>`;
    }
    document.getElementById('task'+listnum).innerHTML = taskListHtml;
    badges();
};
function badges(){
  for (let i=0; i<listNames.length; i++ ){
    document.getElementById('badge' + i).innerHTML = taskList[i].length;
    }
};