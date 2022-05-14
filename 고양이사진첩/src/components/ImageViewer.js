import Component from '../Component.js';

const IMG_URL =
  'https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public';

export default class ImageViewer extends Component {
  componentWillMount() {
    const { filePath } = this.props;
    this.state = { filePath };
    this.parent = document.createElement('div');
    this.parent.className = 'Modal ImageViewer';
    this.$target.append(this.parent);
  }

  render() {
    const { filePath } = this.state;
    this.parent.innerHTML = filePath
      ? `
            <div class="content">
                <img src="${IMG_URL}${filePath}">
            </div>
        `
      : '';
    this.parent.style.display = filePath ? 'block' : 'none';
  }
  setEvent() {
    const { onClick, onKeyDown } = this.props;
    this.parent.addEventListener('click', onClick);
    this.$target.addEventListener('keydown', onKeyDown);
  }
}
