randomSortInit();

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

    document.querySelector('.contentBody').appendChild(optionBox);
    appendOption(optionBox, rSort);
    appendOption(optionBox, pOne);
    appendOption(optionBox, pMul);
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

function check(ele) {
    return new Promise((resolve, reject) => {

        ele.addEventListener('animationend', function() {
            resolve();
        });
    })
}

function delay(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(ms)
        }, ms)
    })
}

async function randomSortInit() {
    await clearEverything();

    var optionBox = document.createElement('form');
    optionBox.classList.add('optionBox');
    optionBox.addEventListener('submit', function(e) { e.preventDefault(); });
    document.querySelector('.contentBody').appendChild(optionBox);

    createInputBox(optionBox);

    var addBtn = createBtn('Add option');
    addBtn.onclick = function() { createInputBox(optionBox); };

    var doneBtn = createBtn('done');
    doneBtn.onclick = function() { getOptions(); }
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
}

function sortOptions(data) {

    var optionMap = [];
    var mx = data.length * 10;


    for (var i = 0; i < data.length; i++) {
        var optionObj = {
            ocr: 0,
            index: i
        };
        optionMap[i] = optionObj;
    }


    for (var r = 0; r < data.length; r++) {
        for (var i = 0; i < mx; i++) {
            var target = Math.floor(Math.random() * data.length);
            optionMap[target].ocr++;
        }
        optionMap = doTheSort(optionMap);
    }

}

function doTheSort(data) {
    for (var i = 1; i < data.length; i++) {
        var temp = data[i];
        var j = i - 1;
        while (j >= 0 && data[j].ocr < temp) {
            data[j + 1] = data[j];
            j--;
        }
        data[j + 1] = temp;
    }
    console.log(data);
    return data;
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

function createInputBox(optionBox) {

    var inp = createOption('', 'input');
    inp.placeholder = "Enter an option";
    inp.type = 'text';
    appendOption(optionBox, inp);

    optionBox.scrollTop = optionBox.scrollHeight;
}

function pickOneInit() {
    clearEverything();
    console.log('pick one');
}

function pickMultipleInit() {
    clearEverything();
    console.log('pick multiple');
}