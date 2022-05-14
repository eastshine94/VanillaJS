import Component from '../Component.js';

export default class Loading extends Component {
  componentWillMount() {
    const { isLoading } = this.props;
    this.state = { isLoading };
    this.parent = document.createElement('div');
    this.parent.className = 'Modal Loading';
    this.$target.append(this.parent);
  }

  render() {
    const { isLoading } = this.state;
    this.parent.innerHTML = `
            <div class="content">
                <img src="./assets/nyan-cat.gif">
            </div>
        `;
    this.parent.style.display = isLoading ? 'block' : 'none';
  }
}
