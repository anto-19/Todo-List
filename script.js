import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');


document.addEventListener("DOMContentLoaded", getTodo);
list.addEventListener('click', removeTodo);
search.addEventListener('keydown', filterTodos);






const todoForm = addForm.addone;
todoForm.addEventListener('blur', () => {
    todoForm.style.border = '1px solid red'
})

todoForm.addEventListener('input', () => {
    if (todoForm.value.length > 0) {
        todoForm.style.border = '0'
    }
})

const generateTemplate = (todo) => {
    todo.forEach(item => {
        let html = `
        <li data-id="${item.id}" class="list-group-item d-flex justify-content-between align-items-center">
            <span>${item.todo}</span>
            <p>${item.time}</p>
            <i class="delete fas fa-trash"></i>
        </li>
         `;
        list.innerHTML += html;
    })
};


function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodo() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    generateTemplate(todos)
};


addForm.addEventListener('submit', e => {
    const time = new Date().toLocaleString();
    const todo = addForm.addone.value.trim();
    const todoForm = addForm.addone;
    const todos = {
        id: uuidv4(),
        todo: todo,
        time: time
    }
    e.preventDefault();
    saveLocalTodos(todos)
    generateTemplate([todos])
    addForm.reset();
    todoForm.classList.remove('error')
});

function filterTodos(e) {
    const term = search.value.trim().toLowerCase();
    if (e.keyCode === 13) {
        e.preventDefault();
    }
    Array.from(list.children)
        .filter(todo => !todo.textContent.toLowerCase().includes(term))
        .forEach(todo => todo.classList.add('filtered'));

    Array.from(list.children)
        .filter(todo => todo.textContent.toLowerCase().includes(term))
        .forEach(todo => todo.classList.remove('filtered'));
};


function removeTodo(e) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const formId = e.target.parentElement;
    if (e.target.classList.contains('delete')) {
        let filteredtodo = todos.filter(item => item.id !== formId.getAttribute('data-id'));
        todos
            .filter(item => item.id === formId.getAttribute('data-id'))
            .forEach(todo => {
                if (todo.id === formId.getAttribute('data-id')) {
                    formId.remove()
                }
            })
        localStorage.setItem("todos", JSON.stringify(filteredtodo));
    }
}

let showtime = () => {
    const time = document.querySelector('#time');
    const today = new Date();
    time.textContent = `${dateFns.format(today,'ddd DD MMM YYYY, H:m:s')}`;
};
setInterval(showtime, 0)