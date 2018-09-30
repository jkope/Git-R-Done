let listNames = [];
let taskList = [];
// let taskInput = document.getElementById('newTask');
let listNameInput = document.getElementById('newListName');
let headerTabs = document.getElementById('tabs');
let listBtn = document.getElementById('newListBtn');
let pages = document.getElementById('pages');
let hTabs = '';
let main = '';
let page = '';
let taskListHtml = '';


function tabs(listNames) {
    hTabs ='';
    main = '';
    for (i=0; i<listNames.length; i++){
        hTabs +=
            `<a id='link-${i}' href="#scroll-tab-${i}" class="mdl-layout__tab ${i == (listNames.length - 1) ? 'is-active' : ''}">${listNames[i]}</a>`;
        main +=
        `<section class="mdl-layout__tab-panel  ${i == (listNames.length-1) ? 'is-active':''}" id ="scroll-tab-${i}">
            <div class="page-content">
                <div id="list" class="list">
                <!-- New Task Text field -->
                <form action="#" class="entryline">
                    <div class="mdl-textfield mdl-js-textfield">
                        <input class="mdl-textfield__input" type="text" id="newTask${i}">
                        <label class="mdl-textfield__label" for="sample1">New Task...</label>
                    </div>
                    <button onclick="addTask('${i}')" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                        <i class="material-icons">add</i>
                    </button>
                </form>
                <!-- list of tasks -->
                <div id="${i}">
                ${i}
                </div>
                <!-- delete whole tab -->
                <button onclick="deleteList('${i}')" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--red">
                    Delete List
                </button>
            </div>
        </section>`;
    }
    headerTabs.innerHTML = hTabs;
    pages.innerHTML = main;
    taskList.push([]);
}

listBtn.addEventListener('click', function(){
    listNames.push(listNameInput.value);
    listNameInput.value = '';
    tabs(listNames);
});

function deleteTask(task) {
    let line = document.getElementById(task);
    line.parentNode.removeChild(line);
}
function deleteList(i){
    listNames.splice(i , 1);
    taskList.splice(i, 1);
    tabs(listNames);


    // let list = document.getElementById(scrolltab);
    // list.parentNode.removeChild(list);
    // let aref = document.getElementById(link);
    // aref.parentNode.removeChild(aref)
}

function addTask(listnum) {
    let newTaskId = 'newTask' + listnum;
    let input = document.getElementById(newTaskId).value;
    taskList[listnum].push(input);
    document.getElementById(newTaskId).value = '';
    taskListHtml = '';
    for (i = 0; i < taskList[(listnum.length)-1]; i++) {
        taskListHtml +=
       `<div id="task${listnum}_${i}" class="task">
            <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox${listnum}_${i}">
                <input type="checkbox" id="checkbox${listnum}_${i}" class="mdl-checkbox__input">
                <span id="item${listnum}_${i}" class="mdl-checkbox__label">${taskList[listnum][i]}</span>
            </label>
                <i id='dlt${listnum}_${i}' onclick="deleteTask('task${listnum}_${i}')" class="material-icons icon">
                    delete
                </i>
        </div>`
    }
    document.getElementById(listnum).innerHTML = taskListHtml;
}

