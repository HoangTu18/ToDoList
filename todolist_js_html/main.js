let listTask = [];

function getLocalListItem() {
    if (localStorage.getItem('listTaskLocal')) {
        return JSON.parse(localStorage.getItem('listTaskLocal'));
    } else {
        return -1;
    }
}
renderTask()
function renderTask() {
    if (getLocalListItem() === -1) {
        return;
    } else {
        listTask = getLocalListItem();
    }

    let listTaskCompleted = listTask.filter(item => item.status === true);
    let listTaskTodo = listTask.filter(item => item.status === false);

    let contentCompleted = createContent(listTaskCompleted, true);
    let contentTodo = createContent(listTaskTodo, false);

    document.querySelector("#completed").innerHTML = contentCompleted;
    document.querySelector("#todo").innerHTML = contentTodo;
}

function createContent(arr, isCompleted) {
    let content = ''
    if (isCompleted) {
        arr.forEach(item => {
            content += `
            <li>
                <span>${item.name}</span>
                <div class="buttons d-flex flex-row-reverse">
                    <button onclick="deleteTask(${item.id})">
                        <i class="remove fa fa-trash-alt"></i>
                    </button>

                    <button class="complete" onclick="changeStatus(${item.id})">
                        <i class="fas fa-check-circle"></i>
                    </button>
                </div>
            </li>    
            `
        })
        return content;
    } else {
        arr.forEach(item => {
            content += `
            <li>  <span>${item.name}</span>
            <div class="buttons d-flex flex-row-reverse">
                <button onclick="deleteTask(${item.id})">
                    <i class="remove fa fa-trash-alt"></i>
                </button>

                <button class="complete" onclick="changeStatus(${item.id})">
                    <i class="far fa-check-circle"></i>
                </button>
            </div></li>
        `
        })
        return content;
    }
}

function changeStatus(id) {
    var comfirmChangeStatus = confirm('Do you wanna change status?')
    if (comfirmChangeStatus) {
        let itemChange = listTask.find(item => item.id == id);
        itemChange.status = !itemChange.status;
        localStorage.setItem("listTaskLocal", JSON.stringify(listTask));
        renderTask();
        alert('Change success!!!');
    }

}

function deleteTask(id) {
    var confirmDelete = confirm('Do you wanna delete task?')
    if (confirmDelete) {
        listTask = listTask.filter(item => item.id != id);
        localStorage.setItem("listTaskLocal", JSON.stringify(listTask));
        renderTask();
        alert('Delete success!!!');
    }
}

document.querySelector("#addItem").addEventListener("click", () => {
    checkTask();
    // var emptyTask = document.querySelector("#newTask").value === '';
    // if (emptyTask) {
    //     document.querySelector("#notiInput").innerHTML = 'You have nothing to-do!';
    //     document.querySelector("#notiInput").style.display = 'block';
    //     return;
    // }

})

function addTask() {
    var xacNhan = confirm('Do you wanna add task?');
    if (xacNhan) {
        let value = document.querySelector("#newTask").value;
        let newTask = new Task(value);
        listTask.push(newTask);
        localStorage.setItem("listTaskLocal", JSON.stringify(listTask));
        renderTask();
        alert('Add success!');
    }
}

function checkTask() {
    var emptyTask = document.querySelector("#newTask").value === '';
    if (emptyTask) {
        document.querySelector("#notiInput").innerHTML = 'You have nothing to-do!';
        document.querySelector("#notiInput").style.display = 'block';
        return;
    }

    var repeatTask = listTask.find(item => item.name === document.querySelector("#newTask").value)
    if (repeatTask) {
        document.querySelector("#notiInput").innerHTML = 'You have yet to complete any tasks.';
        document.querySelector("#notiInput").style.display = 'block';
        return;
    }
    addTask();
}

document.querySelector("#newTask").addEventListener('input', function () {
    var emptyTask = document.querySelector("#newTask").value === '';
    if (emptyTask) {
        document.querySelector("#notiInput").innerHTML = 'You have nothing to-do!';
        document.querySelector("#notiInput").style.display = 'block';
        return;
    }
    document.querySelector("#notiInput").innerHTML = '';
    document.querySelector("#notiInput").style.display = 'none';


    var repeatTask = listTask.find(item => item.name === document.querySelector("#newTask").value)
    if (repeatTask) {
        document.querySelector("#notiInput").innerHTML = 'You have yet to complete any tasks.';
        document.querySelector("#notiInput").style.display = 'block';
        return;
    }
    document.querySelector("#notiInput").innerHTML = '';
    document.querySelector("#notiInput").style.display = 'none';
})



