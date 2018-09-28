let listNames = [];
let listNameInput = document.getElementById('newListName');
let headerTabs = document.getElementById('tabs');
let listBtn = document.getElementById('newListBtn');
let pages = document.getElementById('pages');
let hTabs = '';
let main = '';
let page = '';


function tabs(listNames) {
    hTabs ='';
    main = '';
    for (i=0; i<listNames.length; i++){
        hTabs +=
        `<a href="#scroll-tab-${i}" class="mdl-layout__tab">${listNames[i]}</a></br>`;
        main +=
        `<section class="mdl-layout__tab-panel" id="scroll-tab-${i}">
                <div class="page-content">
                    <!-- Your content goes here -->
                   <p> stuff test stuff </p>
                </div>
            </section>`
    }
    headerTabs.innerHTML = hTabs;
    pages.innerHTML = main;
}

listBtn.addEventListener('click', function(){
    listNames.push(listNameInput.value);
    listNameInput.value = '';
    tabs(listNames);
    // document.getElementsByName('listNames["length"]').focus();
});

function deleteTask(task) {
    let line = document.getElementById(task);
    line.parentNode.removeChild(line);
}
function deleteList(e){
    let list = document.getElementById(e);
    list.parentNode.removeChild(list);
    console.log('it works');
    
}

function addTask() {
    console.log('it works');
}

