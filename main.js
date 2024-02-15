// 유저가 값을 입력한다
// + 버튼을 클릭하면 할일이 추가된다.
// delete 버튼을 누르면 할일이 삭제된다.
// check 버튼을 누르면 할일이 끝나면서 밑줄이 그어진다.
// 1. check 누르면 true->false
// 2. true면 끝난 걸로 간주하고 밑줄
// 3. 안 끝난 걸로 간주하고 그대로
// 진행중 끝남 탭을 누르면 언더바가 이동한다.
// 끝남 탭은 끝난 아이템만, 진행중 탭은 진행중인 아이템만
// 전체 탭을 누르면 다시 전체 아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div")
let taskList = []
let filterList = []
addButton.addEventListener("click", addTask)
let mode = 'all'

for (let i = 1 ; i < tabs.length ; i++){
    tabs[i].addEventListener("click", function(event){
        filter(event)})
}

taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask(){
    let taskContent = taskInput.value;
    if (!taskContent.trim()) return;
    let task = {
        id : randomIDGenerate(),
        taskContent : taskInput.value,
        isComplete: false
    };

    taskList.push(task);
    render();
    taskInput.value = "";
}

function render(){
    // 1. 내가 선택한 탭에 따라서 
    let list = []
    if (mode === "all"){
        list = taskList;
    }
    else{
        list = filterList;
    }
    // 2. 리스트를 달리 보여준다.

    // all -> taskList
    // ongoing, done -> filterList
    let resultHTML ='';
    for(let i = 0; i < list.length; i++){
        let task = list[i];
        resultHTML += 
            `<div class="task">
                <div class="${task.isComplete ? 'task-done' : ''}">
                    ${task.taskContent}
                </div>

                <div>
                    <i class="fa-solid fa-check icon-spacing" onclick="toggleComplete('${task.id}')"></i>
                    <i class="fa-solid fa-trash icon-spacing" onclick="deleteTask('${task.id}')"></i>
        
                </div>
            </div>`;    
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
    for (let i = 0 ; i < taskList.length ; i++){
        if (taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();

    console.log(taskList);

}

function deleteTask(id){
    for (let i = 0 ; i < taskList.length ; i++){
        if (taskList[i].id == id){
            taskList.splice(i, 1)
            break;
        }
    }
    render();
    filter({target: {id:mode}});
}

function filter(event){
    mode = event.target.id;
    filterList= [];

    if(mode === "all"){
        //전체 리스트를 보여준다.
        render();
    }else if (mode === "ongoing"){
        //진행중인 아이템을 보여준다
        //task.isComplete=false
        for (let i = 0 ; i < taskList.length ; i++){
            if (taskList[i].isComplete === false){
                filterList.push(taskList[i])
            }
        }
        render();
    }else if (mode === "done"){
        //끝나는 케이스
        //task.isComplete = true
        for (let i = 0 ; i < taskList.length ; i++){
            if (taskList[i].isComplete === true){
                filterList.push(taskList[i])
            }
        }
        render();
    }
    
    let tabWidth = event.target.offsetWidth;
    let tabOffset = event.target.offsetLeft;
    document.getElementById("under-line").style.width = `${tabWidth}px`;
    document.getElementById("under-line").style.left = `${tabOffset}px`;
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2,9)
}
