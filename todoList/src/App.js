import Todo from './Todo.js';

export default class App {
    $target=  null;

    constructor($target){
        this.$target = $target;
        const todo = new Todo();
    }
}