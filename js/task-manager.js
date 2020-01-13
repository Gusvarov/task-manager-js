const input = document.querySelector('.task-input');
const addButton = document.querySelector('.add-btn');
const removeButton = document.querySelector('.remove-btn');
const form = document.querySelector('form');
const ul = document.querySelector('ul');
const edit = document.querySelector('.edit');
let out = document.querySelector('.out');

let loginedUser = localStorage.loginedUser;
let logOutBtn = document.querySelector('.log-out-btn');
let users = JSON.parse(localStorage.users);
let tasks = localStorage.tasks ? JSON.parse(localStorage.tasks) : [];

out.innerHTML = `Logined As: ${loginedUser}`;

function liMaker(text) {
    const label = document.createElement('label');
    const span = document.createElement('span');
    const div = document.createElement('div');
    const editInput = document.createElement('input');
    const share = document.createElement('button');
    const shareInput = document.createElement('input');
    const p = document.createElement('p');

    let li = document.createElement('li');
    let txt = document.createTextNode('Edit');

    ul.appendChild(li);  
    label.textContent = text;
    li.appendChild(label);
    text = document.createTextNode('Delete');
    span.appendChild(text);
    li.appendChild(span);
    div.className = 'div-class';
    editInput.className = 'text';
    div.appendChild(txt);
    li.appendChild(div);
    editInput.type = 'text';
    li.appendChild(editInput);
    share.type = 'button';
    share.className = 'share-button';
    share.textContent = 'Share';
    li.appendChild(share);
    shareInput.type = 'text';
    shareInput.className = 'input';
    shareInput.placeholder = 'Enter email';
    li.appendChild(shareInput);
    p.className = 'p';
    li.appendChild(p);
}

ul.addEventListener('click', event => {  
    if (event.target.tagName === 'SPAN') {
        let removeElement = event.target.parentNode;
        let prevElement = event.target.previousSibling.textContent;
        tasks.forEach((task, index) => {
            if (prevElement === task.item) {
                removeElement.remove();
                tasks.splice(index, 1);
                localStorage.setItem("tasks", JSON.stringify(tasks));
            }
        })
    }
    if (event.target.className === 'div-class') {
        let label = event.target.previousSibling.previousSibling.textContent;
        let input = event.target.nextSibling.value;
        tasks.forEach(task => {  
            if (task.item === label) {
                task.item = input
                localStorage.setItem("tasks", JSON.stringify(tasks));
            }
        })
        event.target.parentNode.classList.toggle('editMode');
        event.target.previousSibling.previousSibling.textContent = event.target.nextSibling.value;
    }
    if (event.target.className === 'share-button') {
        let sharedInput = event.target.nextSibling;
        sharedInput.classList.toggle('input-block');
        users.forEach(user => {
            if (sharedInput.value === user.email) {
                event.target.nextSibling.nextSibling.textContent = `Shared: ${user.email}`;
                sharedInput.value = '';
                event.target.parentNode.style.height = '50px';
            }
            localStorage.setItem("users", JSON.stringify(users));
        })
    }
}) 

addButton.addEventListener('click', () => {
    if (input.value) {
        tasks.push({'item': input.value});
        localStorage.tasks = JSON.stringify(tasks);
        liMaker(input.value);
        input.value = '';
    } else {
        alert('Please, enter something to add in task manager');
    }
})

removeButton.addEventListener('click', () => {
    localStorage.removeItem('tasks');
    tasks = [];
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
})

logOutBtn.addEventListener('click', () => {
    document.location.href = 'index.html';
})

form.addEventListener('submit', event => {
    event.preventDefault();
})

tasks.forEach(task => {
    liMaker(task.item);
})