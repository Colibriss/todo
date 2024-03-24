const form = document.querySelector('#form')
const taskInput = document.querySelector('#taskInput')
const tasksList=document.querySelector('#tasksList')
const emtyList=document.querySelector('#emptyList')

let tasks=[]

if (localStorage.getItem('tasks')){
    tasks = JSON.parse(localStorage.getItem('tasks'))
}

tasks.forEach((task)=>{
    renderTask(task)
})

checkEmptyList()

// Добавление задачи
form.addEventListener('submit', addTask)

// Удаление задачи
tasksList.addEventListener('click', deleteTask)

// Отмечаем как выполненое
tasksList.addEventListener('click', doneTask)

// if (localStorage.getItem('tasksHTML')){
//     tasksList.innerHTML=localStorage.getItem('tasksHTML')
// }

// Функции
function addTask(event){
// 1.Отменяем отправку формы
    event.preventDefault()
    // console.log('SUBMIT!!')

// 2.Берем текст с инпута
    const taskText=taskInput.value
    // console.log(taskText)
// 2.1. Описываем задачу в виде обьекта 
    const newTasks={
        id: Date.now(),
        text: taskText,
        done: false
    }
// 2.2.Добавляем задачу в массив с задачами
    tasks.push(newTasks)

    // console.log(tasks)

// 2.3. Формируем ссс клас 
    const cssClass = newTasks.done?'task-title task-title--done':'task-title'

// 3.Формируем разметку для новой задачи
    const taskHTML = `
    <li id='${newTasks.id}' class="list-group-item d-flex justify-content-between task-item">
        <span class="${cssClass}">${newTasks.text}</span>
            <div class="task-item__buttons">
                <button type="button" data-action="done" class="btn-action">
                    <img src="./img/tick.svg" alt="Done" width="18" height="18">
                </button>
                <button type="button" data-action="delete" class="btn-action">
                    <img src="./img/cross.svg" alt="Done" width="18" height="18">
                </button>
            </div>
    </li>`;

    // console.log(taskHTML)

// 4.Добавляем задачу на страницу
    tasksList.insertAdjacentHTML('beforeend',taskHTML)

// 5.Очищаем поле ввода
    taskInput.value=''
    taskInput.focus()

// // 6.Проверка есть ли в списке задачь больше 1 задачи
//     if (tasksList.children.length>1){
//         emtyList.classList.add('none')
//     }

    // saveHTMLtoLS()
    checkEmptyList()

    saveToLocalStorage()
}

function deleteTask(event){
    // 1.Проверяем чтобы клик был по кнопке удалить
    if (event.target.dataset.action==='delete'){
        const parentNote = event.target.closest('.list-group-item')

        // 1.1. Удаляем из данных
        // Определяем ID задачи 
        const id = Number(parentNote.id)

        // // Находим индекс задачи в массиве
        // const index = tasks.findIndex((task)=> task.id == id)

        // // Удаляем задачу из массивова с задачами
        // tasks.splice(index, 1)

        // 1.2.Удаляем задачу через фильтрацию массива
        tasks = tasks.filter((task)=>task.id !== id)

        // Удаляем задачу из разметки
        parentNote.remove()


        // // 2.Проверка есть ли в списке задачь больше 1 задачи
        // if (tasksList.children.length===1){
        //     emtyList.classList.remove('none')
        // }
    }
    // saveHTMLtoLS()
    checkEmptyList()

    saveToLocalStorage()
}

function doneTask(event){
    if (event.target.dataset.action==='done'){
        const parentNote = event.target.closest('.list-group-item')

        const id = Number(parentNote.id)
        const task = tasks.find((task)=>task.id === id)

        task.done = !task.done

        const taskTitle = parentNote.querySelector('.task-title')
        taskTitle.classList.toggle('task-title--done')
    }   

    // saveHTMLtoLS()
    saveToLocalStorage()
}

// function saveHTMLtoLS(){
//     localStorage.setItem('tasksHTML', tasksList.innerHTML)
// }

function checkEmptyList(){
    if (tasks.length === 0){
        const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
        <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
        <div class="empty-list__title">Список дел пуст</div>
    </li>`
    tasksList.insertAdjacentHTML('afterbegin', emptyListHTML)
    }

    if (tasks.length > 0){
        const emptyListEl = document.querySelector('#emtyList')
        emptyListEl ? emptyListEl.remove() : null
    }
}

function saveToLocalStorage(){
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task){
    const cssClass = task.done?'task-title task-title--done':'task-title'
    const taskHTML = `
    <li id='${task.id}' class="list-group-item d-flex justify-content-between task-item">
        <span class="${cssClass}">${task.text}</span>
            <div class="task-item__buttons">
                <button type="button" data-action="done" class="btn-action">
                    <img src="./img/tick.svg" alt="Done" width="18" height="18">
                </button>
                <button type="button" data-action="delete" class="btn-action">
                    <img src="./img/cross.svg" alt="Done" width="18" height="18">
                </button>
            </div>
    </li>`;
    tasksList.insertAdjacentHTML('beforeend',taskHTML)
}
