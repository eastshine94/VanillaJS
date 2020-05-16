const $addMenuForm = document.querySelector('.addMenuForm');
const $menuName = $addMenuForm.querySelector('.menuName');
const $menuPrice = $addMenuForm.querySelector('.menuPrice');

const $menuList = document.querySelector('.menuList');

const $purchaseList = document.querySelector('.purchaseList');

const $cost = document.querySelector('.cost');
export default class Shopping {
    constructor() {
        $addMenuForm.addEventListener('submit', handleSubmit);
    }
}

function handleSubmit(event) {
    event.preventDefault();
    const name = $menuName.value;
    const price = $menuPrice.value;
    if(name && Number(price)){
        console.log("메뉴 추가");
        paintMenu(name, Number(price));
        $menuName.value = "";
        $menuPrice.value = "";
    }
}

function paintMenu(name, price){
    const $tbody = $menuList.querySelector('tbody');
    const $tr = document.createElement('tr');
    const $colName = document.createElement('td');
    const $colPrice = document.createElement('td');
    const $colOrder = document.createElement('td');

    $colName.innerText = name;
    $colName.className = "name";
    
    $colPrice.innerText = price;
    $colPrice.className = "price";

    const orderBtn = document.createElement("button");
    orderBtn.innerText = "주문";
    orderBtn.addEventListener("click", handleOrder);
    $colOrder.appendChild(orderBtn);

    $tr.appendChild($colName);
    $tr.appendChild($colPrice);
    $tr.appendChild($colOrder);

    $tbody.appendChild($tr);
    
}

function handleOrder(event) {
    const selectOrder = event.target.parentNode.parentNode;
    const name = selectOrder.querySelector(".name").innerText;
    const price = selectOrder.querySelector(".price").innerText;
    
    const $tbody = $purchaseList.querySelector('tbody');
    const $tr = document.createElement('tr');
    const $colName = document.createElement('td');
    const $colPrice = document.createElement('td');
    const $colDel = document.createElement('td');

    $colName.innerText = name;
    $colName.className = "name";
    
    $colPrice.innerText = price;
    $colPrice.className = "price";

    const $delBtn = document.createElement("button");
    $delBtn.innerText = "삭제";
    $delBtn.addEventListener('click', handleDelete);
    $colDel.appendChild($delBtn);
    $tr.appendChild($colName);
    $tr.appendChild($colPrice);
    $tr.appendChild($colDel);
    $tbody.appendChild($tr);
    getTotalCost();
}

function handleDelete(event){
    
    const select = event.target.parentNode.parentNode;
    const parent = select.parentNode;

    parent.removeChild(select);
    getTotalCost();
}

function getTotalCost() {
    const $tbody = $purchaseList.querySelector('tbody');
    const costList = $tbody.querySelectorAll('.price');
    let cost = 0;
    costList.forEach(val => {
        cost += Number(val.innerText);
    });
    $cost.innerText = cost;
}