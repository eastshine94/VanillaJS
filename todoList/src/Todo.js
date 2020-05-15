const $listTable = document.querySelector(".list-table");
const $tbody = $listTable.querySelector("tbody");
const $input = document.querySelector(".list-input");
const $addBtn = document.querySelector(".add-btn");
const $selDelBtn = document.querySelector(".selDelBtn");
const $allDelBtn = document.querySelector(".allDelBtn");
export default class Todo{
    constructor(){
        $input.addEventListener("keyup",enterkey);
        $addBtn.addEventListener("click",handleAdd);
        $allDelBtn.addEventListener("click",handleAllDel);
        $selDelBtn.addEventListener("click",handleSelectDel);
    }
}

const handleAdd = (event) => {
    event.preventDefault();
    const currVal = $input.value;
    paintToDo(currVal);
    $input.value= "";
};
const enterkey = (event) => {
    if (window.event.keyCode == 13) {
        const currVal = event.target.value;
        paintToDo(currVal);
        event.target.value = "";
    }
};

const handleAllDel = (event) => {
    event.preventDefault();
    console.log("all delete");
    $tbody.innerHTML ="";
};

const handleSelectDel = (event) => {
    event.preventDefault();
    console.log("select delete");
    const trlist= $tbody.querySelectorAll("tr");
    trlist.forEach(tr => {
        if(tr.querySelector(".btn-select").checked){
            $tbody.removeChild(tr);
        }
    });
};

const paintToDo = (text) => {
    const $tr = document.createElement("tr");
    const $col1 = document.createElement("td");
    const $col2 = document.createElement("td");
    const checkBox = document.createElement("input");
    checkBox.type= "checkbox";
    checkBox.className = "btn-select";
    $col1.appendChild(checkBox);
    $col2.innerText = text;
    $tr.appendChild($col1);
    $tr.appendChild($col2);
    $tbody.appendChild($tr);
};