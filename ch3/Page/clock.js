const clockContainer = document.querySelector(".js-clock");
const clockTitle = document.querySelector("h1");


function getTime() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2,"0");
    const min = String(date.getMinutes()).padStart(2,"0");
    const seconds = String(date.getSeconds()).padStart(2,"0");
    clockTitle.innerText = `${hours}:${min}:${seconds}`
}

function init() {
    setInterval(getTime, 1000);
}
init();