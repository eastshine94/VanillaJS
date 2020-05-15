
const toDoForm = document.querySelector(".js-toDoForm");
const $input = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");
const  TODOS_LS = 'todos';
let toDos = [];

export default class Todo {

    constructor(){
        loadTodos();
        toDoForm.addEventListener("submit",handleSubmit);
    }
}

function handleSubmit(event){
    event.preventDefault();
    const text = $input.value;
    paintList(text);
    $input.value ="";
}
function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintList(text){
    const $li = document.createElement("li");
    const $span = document.createElement("span");
    const $Delbtn = document.createElement("button");
    const currID = toDos.length + 1;
    const toDoObj = {
        id: currID,
        text: text,
    };
    $span.innerText = text;    
    $Delbtn.innerText = "X";

    $li.id = currID;
    $li.appendChild($span);
    $li.appendChild($Delbtn);
    toDoList.appendChild($li);
    toDos.push(toDoObj);
    $Delbtn.addEventListener("click", deleteList);
    saveToDos();
}

function deleteList(event) {
    const selectedList = event.target.parentNode;
    toDoList.removeChild(selectedList);
    const cleanTodos = toDos.filter(toDo => Number(toDo.id) !== Number(selectedList.id));
    toDos = cleanTodos;
    saveToDos();
}

function loadTodos() {
    const loadedTodos = localStorage.getItem(TODOS_LS);
    if(loadedTodos !== null){
        const parsedToDos = JSON.parse(loadedTodos);
        parsedToDos.forEach(val => paintList(val.text));
    }
}