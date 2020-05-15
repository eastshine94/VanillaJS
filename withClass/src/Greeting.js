const greeting = document.querySelector(".js-greeting");
const $form = document.querySelector(".js-form");
const $input = $form.querySelector("input");
const USER_LS = "currentUser";
const SHOWING_CN = "showing";

export default class Greeting{

    constructor(){

        loadName();
    }
}

function handleSubmit(event){
    event.preventDefault();
    const text = $input.value;
    saveName(text);
    paintGreeting(text);
}

function saveName(text){
    localStorage.setItem(USER_LS, text);
}
function paintGreeting(text){
    greeting.innerText = `Hello ${text}`;
    $form.classList.remove(SHOWING_CN);
}
function loadName(){
    const user = localStorage.getItem(USER_LS);
    if(user === null){
        $form.classList.add(SHOWING_CN);
        $form.addEventListener("submit",handleSubmit);
    }else{
        paintGreeting(user);
    }
}