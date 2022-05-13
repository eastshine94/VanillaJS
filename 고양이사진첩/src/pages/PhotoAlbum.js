import { fetchData } from '../lib/api.js';
import Breadcrumb from '../components/Breadcrumb.js';
import Nodes from '../components/Nodes.js';
import Loading from '../components/Loading.js';
import ImageViewer from '../components/ImageViewer.js';
import Component from '../../Component.js';

const cache = {};
export default class PhotoAlbum extends Component {
  async fetch({ id }) {
    Loading(true);
    const res = await fetchData({ id });
    Loading(false);
    this.setState({ list: res });
  }
  componentWillMount() {
    this.state = { list: [], nodes: [{ id: null }] };
    this.fetch({ id: null });
  }

  componentDidMount() {
    const handlePrevClick = async () => {
      const prevIdx = this.state.nodes.length - 2;
      await this.fetch(this.state.nodes[prevIdx].id ?? '');
      this.setState({ nodes: this.state.nodes.slice(0, prevIdx + 1) });
    };
    const handleClick = async id => {
      const findNode = this.state.list.find(node => node.id === id);
      if (findNode.type === 'DIRECTORY') {
        await this.fetch({ id });
        this.setState({ nodes: [...this.state.nodes, findNode] });
      } else {
        ImageViewer(findNode.filePath);
      }
    };

    new Breadcrumb(document.querySelector('.Breadcrumb'));
    new Nodes(document.querySelector('.Nodes'), {
      list: this.state.list,
      nodes: this.state.nodes,
      handleClick,
      handlePrevClick
    });
  }
  render() {
    return `
            <div class="Breadcrumb"></div>
            <div class="Nodes"></div>
        `;
  }
}
