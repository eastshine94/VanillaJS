import Clock from './Clock.js';
import Greeting from './Greeting.js';
import Todo from './Todo.js';
export default class App {

    $target = null;
    dashboard = null;
    clock = null;
    greeting = null;
    todo = null
    constructor($target) {
        this.$target = $target;
        this.clock = new Clock($target);
        this.greeting = new Greeting();
        this.todo = new Todo();
    }
}