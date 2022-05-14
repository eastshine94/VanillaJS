export default class Component {
  $target = null;
  props = {};
  state = {};

  constructor($target, props) {
    this.$target = $target;
    this.props = props;
    this.componentWillMount();
    this.render();
    this.setEvent();
  }
  componentWillMount() {}
  template() {}
  componentDidMount() {}
  render() {
    this.$target.innerHTML = this.template();
    this.componentDidMount();
  }

  setEvent() {}
  addEvent(eventType, node, callback) {
    node.addEventListener(eventType, event => {
      callback(event);
    });
  }
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
}
