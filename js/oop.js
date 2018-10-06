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
                role="tab" aria-controls="">${listNames[i]}<span id='badge${i}' class="badge badge-primary badge-pill"></span></a>`
        main +=
           `<div id="l${i}" class="tab-pane fade show ${i === listNames.length-1 ? 'show active' : ''}" role="tabpanel" aria-labelledby="list-home-list">
           <div id="task${i}"> 
            </div>
                <div>
                    <input type="text" placeholder="New Task..." id="newTask${i}">
                </div>
                    <button onclick="addTask('${i}')">
                        ADD
                    </button>
                <button onclick="deleteList('${i}')">
                    Delete List
                </button>
            </div>`;
    };
    headerTabs.innerHTML = hTabs;
    pages.innerHTML = main;
    exclude ? '' : taskList.push([]);
    badges();
}


listBtn.addEventListener('click',  function(){
    listNames.push(listNameInput.value);
    listNameInput.value = '';
    tabs(listNames, false);
});

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
    exclude ? '' : (taskList[listnum]).push(input);
    document.getElementById(newTaskId).value = '';
    taskListHtml = '';
    for (let i = 0; i < taskList[listnum].length; i++) {
        
        taskListHtml +=
            `<div id='${i}' class="form-group form-check">
                <input type="checkbox" class="form-check-input" value='' id="check${listnum}-${i}">
                <label class="form-check-label" for="check${i}">${taskList[listnum][i]}</label>
                <button onclick='deleteTask(${i} ,${listnum}, ${i})' >Delete</button>
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