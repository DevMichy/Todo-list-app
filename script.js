const addTodo = document.querySelector('.add-div');
const lists = document.querySelectorAll('.list');
const parentList = document.querySelector('.list-parent');
const search = document.querySelector('.search');
const markAsDone = document.querySelectorAll('.mark-done');

// add todos 
addTodo.addEventListener('submit', e => {
    e.preventDefault();

    todo = addTodo.add.value.trim();
    if(todo.length){
        parentList.innerHTML += 
            `<li class="list-group-item w-100 mt-1 d-flex justify-content-between list">
                <p class="p"> ${todo}</p> 
                <div class="change-icon">
                    <img src="icons/mark-as-done.png" class="mark-done" alt="">
                    <img src="icons/edit.webp" class="edit" alt="">
                    <img src="icons/delete.png" class="delete" alt="">
                </div>
            </li>`;
        addTodo.reset();
        const todoNameElements = parentList.querySelectorAll('.p');
        const todoArray = [];
        todoNameElements.forEach(todoNameElement => {
            const todoNameInnerHtml = todoNameElement.innerHTML;
            todoArray.push(todoNameInnerHtml);
        })
        localStorage.setItem('todos',JSON.stringify(todoArray));
    }
})

if(localStorage.getItem('todos')){
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    count = 0;
    maxCount = storedTodos.length;
    while(count < maxCount){
        parentList.innerHTML += 
                `<li class="list-group-item w-100 mt-1 d-flex justify-content-between list">
                    <p class="p"> ${storedTodos[count]}</p> 
                    <div class="change-icon">
                        <img src="icons/mark-as-done.png" class="mark-done" alt="">
                        <img src="icons/edit.webp" class="edit" alt="">
                        <img src="icons/delete.png" class="delete" alt="">
                    </div>
                </li>`;
        count++;
    }
}

// delete todos 
parentList.addEventListener('click', e => {
    if(e.target.classList.contains('delete')){
        e.target.parentElement.parentElement.remove();

        const todoNameElements = parentList.querySelectorAll('.p');
        const todoArray = [];
        todoNameElements.forEach(todoNameElement => {
            const todoNameInnerHtml = todoNameElement.innerHTML;
            todoArray.push(todoNameInnerHtml);
        })
        localStorage.setItem('todos',JSON.stringify(todoArray));
    }
})

// edit todos 
parentList.addEventListener('click', e => {
    if(e.target.classList.contains('edit')){
        e.target.parentElement.parentElement.contentEditable = "true";
        e.target.parentElement.parentElement.style.backgroundColor = "rgb(155, 155, 155)";
        e.target.parentElement.parentElement.style.border = "2px solid white"; 
        
        const todoNameElements = parentList.querySelectorAll('.p');
        const todoArray = [];
        todoNameElements.forEach(todoNameElement => {
            const todoNameInnerHtml = todoNameElement.innerHTML;
            todoArray.push(todoNameInnerHtml);
        })
        localStorage.setItem('todos',JSON.stringify(todoArray));
    }
})

document.addEventListener('click', e => {
        if(!e.target.classList.contains('list') && !e.target.classList.contains('edit') && !e.target.classList.contains('p')){
        lists.forEach( list => {
            list.contentEditable = "false";
        });
        lists.forEach(list => {
            list.style.backgroundColor = "#6c757d";
        }); 
        lists.forEach(list => {
            list.style.border = "none";
        }); 
    }
})

// mark todo as done 
parentList.addEventListener('click', e => {
    if(e.target.classList.contains('mark-done')){

        // cnt from this next line 
        e.target.parentElement.parentElement = "rgb(155, 155, 155)";
    }
})

// search for todo 
search.addEventListener('keyup', () => {
    searchTerm = search.value.toLowerCase().trim();

    Array.from(parentList.children)
        .filter(list => !list.textContent.toLowerCase().includes(searchTerm))
        .forEach(list => list.classList.add('filtered'));

    Array.from(parentList.children)
        .filter(list => list.textContent.toLowerCase().includes(searchTerm))
        .forEach(list => list.classList.remove('filtered'));
})