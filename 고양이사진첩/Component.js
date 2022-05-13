export default class Component {
  $target = null;
  props = null;
  state = {};
  constructor($target, props) {
    this.$target = $target;
    this.props = props;
    this.componentWillMount();
    this.mount();
  }
  componentWillMount() {}
  render() {}
  mount() {
    this.$target.innerHTML = this.render();
    this.componentDidMount();
  }
  componentDidMount() {}
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.mount();
  }
  addEvent(eventType, node, callback) {
    node.addEventListener(eventType, event => {
      callback(event);
    });
  }
}
