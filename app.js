//Selectors
const todoInput =  document.querySelector('.todo-input');
const todoBtn =  document.querySelector('.todo-btn');
const todoList =  document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

if(localStorage.getItem('ID') === null){
localStorage.setItem('ID', 0);
}
//console.log(localStorage.getItem("ID"));


//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteTodo);
filterOption.addEventListener('click', filterTodo);





//Functions

function addTodo(e){
    e.preventDefault();

    //Create a div element container
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create a li element
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    //Insert 'li' element in 'div'
    todoDiv.appendChild(newTodo);
    
    //Add todo to local storage
    let ID;
    saveLocalTodos(todoInput.value, todoDiv.classList, todoDiv);

    //Checked element
    const completed = document.createElement('button');
    completed.innerHTML = '<i class="fas fa-check"></i>';
    completed.classList.add("complete-btn");
    todoDiv.appendChild(completed);

    //Delete element
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.classList.add("trash-btn");
    todoDiv.appendChild(deleteBtn);

    
    //Append all to list
    todoList.appendChild(todoDiv);

    todoInput.value="";

    

    //Clear todo input value
    
}

function deleteTodo(e) {

    const item = e.target;
    //Delete todo
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', e => {
            todo.remove();
        })
    }
    //Check mark
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        if(todo.classList.contains("completed")){
          todo.classList.remove("completed");
          
        }else{
          todo.classList.add("completed");
        }
        //console.log(todo.dataset.id, todo.classList[1]);
        updateLocalTodos(todo.dataset.id, todo.classList[1]);
      
    }

    


}
function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
      switch (e.target.value) {
        case "all":
          todo.style.display = "flex";
          break;
        case "completed":
          if (todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
        case "uncompleted":
          if (!todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
      }
    });
  }

  function saveLocalTodos(todo, classe, todoDiv){
    //CHECK controllo se ho altri elementi dentro

    let todos;
    let id = localStorage.getItem("ID");
    
    if(localStorage.getItem('todos') === null){
      todos =[];
    }else{
      todos = JSON.parse(localStorage.getItem('todos'));
    }
    todoObj = {id:id, todo:todo, classe:classe};
    todos.push(todoObj);
    localStorage.setItem('todos', JSON.stringify(todos));
    todoDiv.setAttribute("data-id", id);
    id++;
    localStorage.setItem("ID", id);
    
    //console.log(localStorage.getItem('todos'));
  }

  function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
      todos =[];
    }else{
      todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
      const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo", todo.classe[1]);

    //Create a li element
    const newTodo = document.createElement('li');
    newTodo.innerText = todo.todo;
    newTodo.classList.add('todo-item');
    //Insert 'li' element in 'div'
    todoDiv.appendChild(newTodo);
    todoDiv.setAttribute("data-id", todo.id);
    

    //Checked element
    const completed = document.createElement('button');
    completed.innerHTML = '<i class="fas fa-check"></i>';
    completed.classList.add("complete-btn");
    todoDiv.appendChild(completed);

    //Delete element
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.classList.add("trash-btn");
    todoDiv.appendChild(deleteBtn);


    //Append all to list
    todoList.appendChild(todoDiv);
    })
  }

  function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
      todos =[];
    }else{
      todos = JSON.parse(localStorage.getItem('todos'));
    }
    //const todoIndex = todo.dataset.id;
    //console.log(todos)
    
    const indexOfObject = todos.findIndex(object => {
      return object.id === todo.dataset.id;
    });
    //console.log(indexOfObject);
    todos.splice(indexOfObject,1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function updateLocalTodos(id, classe){
    let todos;
    if(localStorage.getItem('todos') === null){
      todos =[];
    }else{
      todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todoArr){
      if(todoArr.id === id){
        todoArr.classe[1] = classe;
      }
      return todos;
      }
    );
    localStorage.setItem("todos", JSON.stringify(todos));
    //console.log(todo)
    //console.log(classe);
    }
console.log(localStorage.getItem("todos"));
