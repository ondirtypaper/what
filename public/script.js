const passwordBtn = document.getElementById('button_password');
const passwordInput = document.getElementById('input_password');
const list = document.getElementById('list_todo');
let hasReadAuth = false;
const listData = ["생활코딩 - node js.", 
    "kt 포트포워딩 설정 통해 외부 접속 허용", 
    "Oracle database 설치",
    "PickUpGame ver 1.0 준비"];

passwordBtn.addEventListener('click', ()=>{
    if(passwordInput.value === "1106511") {
        hasReadAuth = true;
        getToDoList();
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