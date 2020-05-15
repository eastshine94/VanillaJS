const clock = document.querySelector(".js-clock");

export default class Clock {
    $target = null;
    constructor($target){
        this.$target = $target;
        setInterval(() => this.getTime(), 1000);
    }

    getTime() {
        const date = new Date();
        const hours = String(date.getHours()).padStart(2,"0");
        const min = String(date.getMinutes()).padStart(2,"0");
        const second = String(date.getSeconds()).padStart(2,"0");
        clock.innerText = `${hours}:${min}:${second}`;    
    }
}