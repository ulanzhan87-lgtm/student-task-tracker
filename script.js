const tg = window.Telegram.WebApp;

tg.expand();

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

function addTask(){

    let text = document.getElementById("taskInput").value;
    let date = document.getElementById("dateInput").value;

    if(text === ""){
        alert("Введите задание");
        return;
    }

    tasks.push({
        text:text,
        date:date,
        done:false
    });

    saveTasks();

    document.getElementById("taskInput").value="";
    document.getElementById("dateInput").value="";

    renderTasks();
}

function renderTasks(){

    let list = document.getElementById("taskList");

    list.innerHTML="";

    tasks.forEach((task,index)=>{

        let li=document.createElement("li");

        if(task.done){
            li.classList.add("completed");
        }

        li.innerHTML=`
            <div>
                <strong>${task.text}</strong><br>
                📅 ${task.date}
            </div>

            <div class="actions">
                <button onclick="toggleTask(${index})">✔</button>
                <button onclick="deleteTask(${index})">🗑</button>
            </div>
        `;

        list.appendChild(li);
    });
}

function toggleTask(index){

    tasks[index].done=!tasks[index].done;

    saveTasks();

    renderTasks();
}

function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();

    renderTasks();
}

function saveTasks(){

    localStorage.setItem("tasks",JSON.stringify(tasks));
}
