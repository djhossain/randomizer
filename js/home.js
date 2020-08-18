createHome();
var choice;
var pickMul;

async function createHome() {

    //clearing the sections
    await clearEverything();

    //creating elements
    var optionBox = document.createElement('div');
    optionBox.classList.add('optionBox');

    var rSort = createOption('random sort', 'span');
    rSort.onclick = randomSortInit;

    var pOne = createOption('pick one', 'span');
    pOne.onclick = pickOneInit;

    var pMul = createOption('pick multiple', 'span');
    pMul.onclick = pickMultipleInit;

    var fullScreenBtn = createBtn('Full screen');
    fullScreenBtn.onclick = function() { openFullscreen(); }

    document.querySelector('.contentBody').appendChild(optionBox);
    appendOption(optionBox, rSort);
    appendOption(optionBox, pOne);
    appendOption(optionBox, pMul);
}

async function takeOptionsInit() {
    await clearEverything();

    var optionBox = document.createElement('form');
    optionBox.classList.add('optionBox');
    optionBox.onsubmit = function(e) {
        e.preventDefault();
    };
    document.querySelector('.contentBody').appendChild(optionBox);

    createInputBox(optionBox, "Enter an option").focus();

    var addBtn = createBtn('Add option');
    addBtn.onclick = function() { createInputBox(optionBox, "Enter an option").focus(); };

    var doneBtn = createBtn('done');
    doneBtn.onclick = function() { getOptions(); }
}

async function showResults(sortedData) {

    await clearEverything();
    var mx = sortedData.length;

    switch (choice) {
        case 1:
            showStart = 0;
            showEnd = mx;
            break;
        case 2:
            showStart = 0;
            showEnd = 1 > mx ? mx : 1;
            break;
        case 3:
            showStart = 0;
            showEnd = pickMul > mx ? mx : pickMul;
            break;
    }

    var optionBox = document.createElement('div');
    optionBox.classList.add('optionBox');
    document.querySelector('.contentBody').appendChild(optionBox);

    for (var i = showStart; i < showEnd; i++) {
        var box = createOption(sortedData[i], 'span');
        box.classList.remove('popUp');
        box.classList.add('popUpNoHover');
        appendOption(optionBox, box);
    }

    var againBtn = createBtn('Try again');
    againBtn.onclick = function() { takeOptionsInit(); };

    var homeBtn = createBtn('Home');
    homeBtn.onclick = function() { createHome(); }

}
async function takePickMul() {

    await clearEverything();

    var optionBox = document.createElement('form');
    optionBox.classList.add('optionBox');
    optionBox.addEventListener('submit', function(e) { e.preventDefault(); });
    document.querySelector('.contentBody').appendChild(optionBox);

    createInputBox(optionBox, "How many to pick?");

    var doneBtn = createBtn('next');
    doneBtn.onclick = function() {
        pickMul = document.querySelector('.option').value;
        pickMul = parseInt(pickMul);
        takeOptionsInit();
    }
}

function getOptions() {

    var optionBox = document.querySelector('.optionBox');
    var options = [];

    for (var i = 0; i < optionBox.children.length; i++) {
        var val = optionBox.children[i].value;

        if (val != '') {
            val = val.toLowerCase();
            options.push(val);
        }

    }

    var sortedOptions = sortOptions(options);

    showResults(sortedOptions);
}

function sortOptions(data) {

    var optionMap = [];
    var mx = data.length * 10;


    for (var i = 0; i < data.length; i++) {
        var nam = data[i];
        var optionObj = {
            ocr: 0,
            name: nam
        };
        optionMap[i] = optionObj;
    }


    for (var r = 0; r < data.length * 100; r++) {
        for (var i = 0; i < mx; i++) {
            var target = Math.floor(Math.random() * data.length);
            optionMap[target].ocr++;
        }
        optionMap = doTheSort(optionMap);
    }

    for (var i = 0; i < data.length; i++) {
        data[i] = optionMap[i].name;
    }

    return data;
}

function doTheSort(data) {
    for (var i = 1; i < data.length; i++) {
        var temp = data[i];
        // console.log(temp);
        var j = i - 1;
        while (j >= 0 && data[j].ocr < temp.ocr) {
            data[j + 1] = data[j];
            j--;
        }
        data[j + 1] = temp;
    }
    return data;
}

function randomSortInit() {
    choice = 1;
    takeOptionsInit();
}

function pickOneInit() {
    choice = 2;
    takeOptionsInit();
}

function pickMultipleInit() {
    choice = 3;
    takePickMul();
}

async function clearEverything() {
    var contentBody = document.querySelector('.contentBody');
    contentBody.classList.add('disApear');
    await check(contentBody);
    contentBody.innerHTML = '';
    contentBody.classList.remove('disApear');

    var bottomBar = document.querySelector('.bottomBar');
    bottomBar.classList.add('disApear');
    await check(bottomBar);
    bottomBar.innerHTML = '';
    bottomBar.classList.remove('disApear');
    return new Promise((resolve, reject) => {
        resolve();
    })
}

function createOption(text, type) {
    var ele = document.createElement(type);
    ele.classList.add('popUp');
    ele.classList.add('option');
    ele.innerHTML = text;

    return ele;
}

function appendOption(parent, child) {
    child.classList.add('optionApear');
    parent.appendChild(child);
}

function createBtn(text) {

    var btn = document.createElement('span');
    btn.classList.add('btn');
    btn.classList.add('popUp');
    btn.innerHTML = text;
    var btnDiv = document.querySelector('.bottomBar');

    appendOption(btnDiv, btn);

    return btn;
}

function createInputBox(optionBox, text) {

    var inp = createOption('', 'input');
    inp.placeholder = text;
    inp.type = 'text';
    appendOption(optionBox, inp);

    optionBox.scrollTop = optionBox.scrollHeight;

    return inp;
}

function check(ele) {
    return new Promise((resolve, reject) => {

        ele.addEventListener('animationend', function() {
            resolve();
        });
    })
}