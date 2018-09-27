let listNames = [];
let listNameInput = document.getElementById('newListName');
let headerTabs = document.getElementById('tabs');
let listBtn = document.getElementById('newListBtn');
let pages = document.getElementById('pages');
let hTabs = '';
let main = '';


function tabs(listNames) {
    hTabs ='';
    for (i=0; i<listNames.length; i++){
        hTabs +=
        `<a href="#scroll-tab-${i}" class="mdl-layout__tab">${listNames[i]}</a></br>`;
        
    }
    headerTabs.innerHTML = hTabs;
}

listBtn.addEventListener('click', function(){
    listNames.push(listNameInput.value);
    listNameInput.value = '';
    tabs(listNames);
});