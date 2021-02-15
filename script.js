const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');
const time = document.querySelector('#time');

const generateTemplate = todo => {
    let html = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${todo}</span>
            <i class="far fa-trash-alt delete"></i>
        </li>
    `;
list.innerHTML += html;
};

const filterTodos = (term) => {
    Array.from(list.children)
        .filter( todo => !todo.textContent.toLowerCase().includes(term))
        .forEach( todo => todo.classList.add('filtered'));

    Array.from(list.children)
        .filter( todo => todo.textContent.toLowerCase().includes(term))
        .forEach( todo => todo.classList.remove('filtered'));
};


addForm.addEventListener('submit', e => {
    e.preventDefault();
    const todo = addForm.addone.value.trim()
    const todoForm = addForm.addone;
    if  ( todo.length ){
        generateTemplate(todo)
        addForm.reset();
        todoForm.classList.remove('error')
    }else{
        todoForm.classList.add('error');
    }
});

//delete todos
list.addEventListener('click' , e => {
    if (e.target.classList.contains('delete')){
        e.target.parentElement.remove();
    }
});


search.addEventListener('keydown', (e) => {
    const term = search.value.trim().toLowerCase();
    filterTodos(term)
    if (e.keyCode === 13){
        e.preventDefault();
    }
});

let showtime = () => {
    let  today = new Date();
    time.textContent =  `${dateFns.format(today,'ddd DD MMM YYYY, H:m:s')}`;
};
setInterval( showtime, 1000)
console.log();