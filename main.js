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
let taskList = []
addButton.addEventListener("click", addTask)

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
    let resultHTML ='';
    for(let i = 0; i < taskList.length; i++){
        let task = taskList[i];
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
}


function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2,9)
}
