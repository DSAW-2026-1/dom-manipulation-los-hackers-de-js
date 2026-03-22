const deleteText = "[Delete]"

const pendingTaskDOM = document.getElementById("pending")
const completedTaskDOM = document.getElementById("completed")

function NewTask(taskText, isDone){
    let newTask = document.createElement("div");
    newTask.classList.add("task");
    
    let newCheckbox = document.createElement("input");
    let newParagraph = document.createElement("p");
    let newDeleteBtn = document.createElement("span");

    newCheckbox.type = "checkbox";
    newCheckbox.classList.add("done");
    newDeleteBtn.classList.add("delete");

    newParagraph.innerText = taskText;
    newDeleteBtn.innerHTML = deleteText;
    if(isDone){
        newCheckbox.checked = true;
    }

    newTask.append(newCheckbox);
    newTask.append(newParagraph);
    newTask.append(newDeleteBtn);

    //I have no idea why it doesn't like the function directly and needs it in this goofy ass way but it works so idc
    newCheckbox.addEventListener("change", function(){onCheckboxEventListener(newTask)});
    newDeleteBtn.addEventListener("click", function(){onDeleteEventListener(newTask)});

    return newTask;
}

function CreateTask(taskText){
    let newTask = NewTask(taskText, false);
    pendingTaskDOM.append(newTask);
}

function DeleteTask(task){
    task.remove();
}

function MoveTask(task, finalDOM, markCompleted){
    task.remove();
    task.getElementsByClassName("done")[0].checked = markCompleted;
    finalDOM.append(task);
}

function onCheckboxEventListener(task){
    let checkbox = task.getElementsByClassName("done")[0];
    if(checkbox.checked == true){
        MoveTask(task, completedTaskDOM, true);
    }
    else{
        MoveTask(task, pendingTaskDOM, false);
    }
}

function onDeleteEventListener(task){
    DeleteTask(task);
}

//TODO: Creating empty tasks should probably be illegal
document.getElementById("createTaskBtn").addEventListener("click", function(){
    let newTaskInput = document.getElementById("createTaskText");
    let newTaskText = newTaskInput.value;
    CreateTask(newTaskText);
    newTaskInput.value = "";
})