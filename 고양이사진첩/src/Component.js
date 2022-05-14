export default class Component {
  $target = null;
  props = {};
  state = {};
  constructor($target, $props) {
    this.$target = $target;
    this.props = $props;
    this.componentWillMount();
    this.render();
    this.setEvent();
  }
  componentWillMount() {}
  render() {}
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  setEvent() {}
}
