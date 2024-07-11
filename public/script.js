const passwordBtn = document.getElementById('button_password');
const passwordInput = document.getElementById('input_password');
const list = document.getElementById('todo-list');
const listContainer = document.getElementById('todo-container');
listContainer.style.display = 'none';

let hasReadAuth = false;
const listData = ["생활코딩 - node js.", 
    "kt 포트포워딩 설정 통해 외부 접속 허용", 
    "Oracle database 설치",
    "PickUpGame ver 1.0 준비"];

passwordBtn.addEventListener('click', ()=>{
    if(passwordInput.value === "1106511") {
        hasReadAuth = true;
        getToDoList();
        listContainer.style.display = 'block';

    }
    passwordInput.value = "";
})

const getToDoList = () => {
    listData.forEach((data)=>{
        const newLi = document.createElement('li');
        newLi.className = "todo";
        newLi.appendChild(
            document.createTextNode(data)
        );
        list.appendChild(newLi);
    })
    
}

document.getElementById('add-button').addEventListener('click', addTodo);
document.getElementById('todo-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});

function addTodo() {
    const input = document.getElementById('todo-input');
    const task = input.value.trim();

    if (task === '') {
        alert('Please enter a task.');
        return;
    }

    const li = document.createElement('li');
    li.textContent = task;

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Remove';
    closeButton.className = 'close';
    closeButton.addEventListener('click', function() {
        li.remove();
    });

    li.appendChild(closeButton);
    document.getElementById('todo-list').appendChild(li);

    input.value = '';
    input.focus();
}
