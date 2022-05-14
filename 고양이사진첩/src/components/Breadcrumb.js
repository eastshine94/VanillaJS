import Component from '../Component.js';

export default class Breadcrumb extends Component {
  componentWillMount() {
    this.state = { list: this.props.list };
    this.parent = document.createElement('nav');
    this.parent.className = 'Breadcrumb';
    this.$target.append(this.parent);
  }
  render() {
    const { list } = this.state;
    this.parent.innerHTML = `
            ${list
              .map((val, idx) => `<div data-idx=${idx}>${val}</div>`)
              .join('')}
        `;
  }

  setEvent() {
    const { onClick } = this.props;
    this.parent.addEventListener('click', event => {
      const node = event.target.closest('div');
      if (!node) return;
      const { idx } = node.dataset;
      if (!idx) {
        return;
      }
      onClick(idx);
    });
  }
}
