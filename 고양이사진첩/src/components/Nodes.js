import Component from '../Component.js';

export default class Nodes extends Component {
  componentWillMount() {
    const { list } = this.props;
    this.state = { list };
    this.parent = document.createElement('div');
    this.parent.className = 'Nodes';
    this.$target.append(this.parent);
  }
  render() {
    const { list } = this.state;
    this.parent.innerHTML = `
            ${
              list.length > 0 && !list[0].parent
                ? ''
                : `<div class="Node">
                    <img src="./assets/prev.png">
                </div>`
            }
            ${list
              .map(val => {
                const { id, name, type } = val;
                return `
                    <div class="Node" data-id=${id}>
                        ${
                          type === 'DIRECTORY'
                            ? '<img src="./assets/directory.png">'
                            : '<img src="./assets/file.png">'
                        } 
                        <div>${name}</div>
                    </div>
                `;
              })
              .join('')}
        `;
  }
  setEvent() {
    const { onClick, onPrevClick } = this.props;
    this.parent.addEventListener('click', event => {
      const node = event.target.closest('.Node');
      if (!node) {
        return;
      }
      const { id } = node.dataset;
      if (!id) {
        onPrevClick();
        return;
      }
      onClick(id);
    });
  }
}
