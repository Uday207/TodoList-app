var todoList = [];
var comdoList = [];
var remList = [];
var addButton = document.getElementById("add-button");
var todoInput = document.getElementById("todo-input");
var deleteAllButton = document.getElementById("delete-all");
var allTodos = document.getElementById("all-todos");
var deleteSButton = document.getElementById("delete-selected");

//event listners for add and delete
addButton.addEventListener("click", add);
deleteAllButton.addEventListener("click", deleteAll);
deleteSButton.addEventListener("click", deletecom);

//event listner for enter key
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        add();
    }
});

//event listeners for filter task
document.addEventListener('click', (e) => {
    if (e.target.className.split(' ')[0] == 'complete' || e.target.className.split(' ')[0] == 'comitems') {
        completeTodo(e);
    }
    if (e.target.className.split(' ')[0] == 'delete' || e.target.className.split(' ')[0] == 'delitems') {
        deleteTodo(e)
    }
    if (e.target.id == "all") {
        addinmain(todoList);
    }
    if (e.target.id == "rem") {
        addinmain(remList);
    }
    if (e.target.id == "com") {
         addinmain(comdoList);
    }
});


//adds the tasks in main list
function add() {
    var value = todoInput.value;
    if (value === '' || value===' ') {
        alert("Task cannot be empty");
        return;
    }
    todoList.push({
        task: value,
        id: Date.now().toString(),
        complete: false
    });
    todoInput.value = "";
    update();
    addinmain(todoList);
}
// the main list and views on the main content
function addinmain(todoList) {
    allTodos.innerHTML = "";
    todoList.forEach(element => {
        var x = `<li id=${element.id} class="todo-item">
    <p id="task"> ${element.complete ? `<strike>${element.task}</strike>` : element.task} </p>
    <div class="todo-actions">
                <button class="complete btn-done btn-success">
                    <i class="comitems d-none inner-check text-success float-right fas fa-check mt-1 mx-4"></i>
                </button>
                <button class="delete btn-done btn-error" >
                    <i class="delitems d-none delete-inner-item text-danger float-right fas fa-times mt-1 mx-1"></i>
                </button>
            </div>
        </li>`
        allTodos.innerHTML += x;
    });
}

//completes indiviaula task and updates all the list
function completeTodo(e) {
    var completed = e.target.parentElement.parentElement.getAttribute('id');
    todoList.forEach((obj) => {
        if (obj.id == completed) {
            if (obj.complete == false) {
                obj.complete = true;
                console.log(e.target.parentElement.parentElement);
                e.target.parentElement.parentElement.querySelector("#task").classList.add("line");
            } else {
                obj.complete = false;
                e.target.parentElement.parentElement.querySelector("#task").classList.remove("line");
            }
        }
    })
    update();
    addinmain(todoList);
}

//deletes and indiviual task and update all the list
function deleteTodo(e) {
    var deleted = e.target.parentElement.parentElement.getAttribute('id');
    todoList = todoList.filter((ele) => {
        return ele.id != deleted;
    })
    update();
    addinmain(todoList);
}

//deletes all the tasks
function deleteAll(todo) {
    todoList = [];
    update();
    addinmain(todoList);
}

//deletes only completed task
function deletecom(todo) {
    todoList = todoList.filter((ele) => {
        return !ele.complete;
    })
    update();
    addinmain(todoList);
}

//updates the all the remaining, completed and main list
function update() {
    comdoList = todoList.filter((ele) => {
        return ele.complete;
    })
    remList = todoList.filter((ele) => {
        return !ele.complete;
    })
    document.getElementById("remaining-count").innerText = todoList.length.toString();
    document.getElementById("completed-count").innerText = comdoList.length.toString();
}
