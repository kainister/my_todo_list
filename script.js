//Drag And Drop
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("dragged-id", ev.target.className);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("dragged-id");
    ev.target.appendChild(document.getElementsByClassName(data)[0]);
}

//Local Storage
function addOnLS(rowTitle) {
    var arrayRows = JSON.parse(localStorage.getItem("savedTask"));
    arrayRows[rowTitle] = {};
    var row = localStorage.setItem("savedTask", JSON.stringify(arrayRows));
}
function saveTask() {
    return JSON.parse(localStorage.getItem("savedTask"));
}

window.onload = function(){
    if (localStorage.getItem("savedTask") == null) {
        var arr = {};
        localStorage.setItem("savedTask", JSON.stringify(arr));
    } else {
        saveTask();
    }

    document.querySelector('#add').onclick = function newColomn() {
        var addcolumns = document.createElement("div");
        document.getElementById('columns').appendChild(addcolumns);
        addcolumns.classList.add("column");
        addcolumns.setAttribute("ondrop","drop(event)");
        addcolumns.setAttribute("ondragover","allowDrop(event)");


        var addDelete = document.createElement("button");
        var addTitle = document.createElement('span');
        var addTable = document.createElement("button");
        var link = document.createElement("a");
        var linkBack = document.createElement("a");
        link.setAttribute("href", "#link");
        linkBack.setAttribute("href", "#");
        addTitle.setAttribute("contenteditable", "true");
        addcolumns.appendChild(addDelete);
        addcolumns.appendChild(addTitle);
        addcolumns.appendChild(addTable);
        var textTask = document.createTextNode('task');
        var exit = document.createTextNode('X');
        var buttonAddTable = document.createTextNode('Add Table');
        addTitle.appendChild(textTask);
        addDelete.appendChild(exit);
        addTable.appendChild(buttonAddTable);
        addDelete.classList.add("delete");
        addTable.classList.add("btnAddTable");
        addTitle.classList.add("titleTask");

        addOnLS(addcolumns);


        var close = document.querySelectorAll('.delete');
        for (var i = 0; i < close.length; i++) {
            close[i].onclick = function remove() {
                var div = this.parentElement;
                this.parentElement.remove(div);
            };
        }


        var task = document.querySelectorAll('.titleTask');

        
            addTable.onclick = function NewTable() {
                var createTable = document.createElement("div");
                createTable.classList.add("Table");
                createTable.setAttribute("draggable", "true");
                createTable.setAttribute("ondragstart", "drag(event)");

                var createInputTitle = document.createElement("input");
                createInputTitle.setAttribute("type", "text");
                createInputTitle.classList.add("inputTitle");
                addcolumns.appendChild(createTable);
                createTable.appendChild(createInputTitle);

                var createdescription = document.createElement("textarea");
                createdescription.classList.add("inputDescription");
                createTable.appendChild(createdescription);

                var createButton = document.createElement("button");
                var textButton = document.createTextNode('Enter');
                createTable.appendChild(createButton);
                createButton.appendChild(textButton);
                createButton.classList.add("createButton");


                createButton.onclick = function GetValueOnTable() {
                    createInputTitle.style.display = "none";
                    createdescription.style.display = "none";
                    createButton.style.display = "none";
                    addcolumns.appendChild(link);
                    link.appendChild(createTable);
                    createTable.innerHTML = '<span class="title">' + createInputTitle.value + '</span><br><span class ="descr">' + createdescription.value + '</span>';

                    createTable.onclick = function displayPopup() {
                        var popUp = document.querySelector('.popup');
                        popUp.style.display = "block";
                        popUp.innerHTML = '<a href="#"><button class="leavePopup">X</button></a><span class="task">' + task.value +
                            '</span><br><input type="text" class="titlePopUp" value="' + createInputTitle.value + '"><br><textarea class="descriptionPopUp">'
                            + createdescription.value + '</textarea><br><a href="#"><button class="btnChange">Change</button></a>';

                        var btnChange = document.querySelector('.btnChange');
                        btnChange.onclick = function changeTable() {
                            var titlePopUp = document.querySelector('.titlePopUp');
                            var descriptionPopUp = document.querySelector('.descriptionPopUp');

                            createTable.innerHTML = '<span class="title">' + titlePopUp.value + '</span><br><span class ="descr">' + descriptionPopUp.value + '</span>';
                        };
                    };


                };
            };



                };

};