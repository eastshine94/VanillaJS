import Component from '../../Component.js';

export default class Nodes extends Component {
  render() {
    const { list, nodes } = this.props;
    return `
            ${
              nodes.length > 1
                ? `<div class="Node">
                    <img src="./assets/prev.png">
                </div>`
                : ''
            }
            ${list
              .map(val => {
                const { id, name, type } = val;
                return `
                    <div class="Node" data-id=${id}>
                        ${
                          type === 'DIRECTORY'
                            ? `<img src="./assets/directory.png"/>`
                            : `<img src="./assets/file.png"/>`
                        }
                        <div>${name}</div>
                    </div>
                `;
              })
              .join('')}
        `;
  }
  componentDidMount() {
    const { nodes, handleClick, handlePrevClick } = this.props;
    const elements = document.querySelectorAll('.Node');

    elements.forEach((ele, idx) => {
      if (idx === 0) {
        this.addEvent('click', ele, event => {
          const { id } = event.currentTarget.dataset;
          nodes.length > 1 ? handlePrevClick() : handleClick(id);
        });
      } else {
        this.addEvent('click', ele, event => {
          const { id } = event.currentTarget.dataset;
          handleClick(id);
        });
      }
    });
  }
}
