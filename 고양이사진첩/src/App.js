import Component from './Component.js';
import Breadcrumb from './components/Breadcrumb.js';
import Nodes from './components/Nodes.js';
import Loading from './components/Loading.js';
import ImageViewer from './components/ImageViewer.js';
import { fetchData } from './lib/api.js';

export default class App extends Component {
  async fetch(id) {
    this.Loading.setState({ isLoading: true });
    const res = await fetchData(id);
    this.setState({ list: res, nodes: [...this.state.nodes, res] });
    this.Loading.setState({ isLoading: false });
  }
  componentWillMount() {
    this.state = { list: [], nodes: [], depth: ['root'], filePath: null };
    this.Loading = new Loading(document.body, { isLoading: false });
    this.fetch();
  }
  render() {
    this.Breadcrumb = new Breadcrumb(this.$target, {
      list: this.state.nodes,
      onClick: idx => {
        const { depth, nodes } = this.state;
        idx = Number(idx);
        if (idx === nodes.length - 1) {
          return;
        }

        this.setState({
          list: nodes[idx],
          depth: depth.slice(0, idx + 1),
          nodes: nodes.slice(0, idx + 1)
        });
      }
    });
    this.Nodes = new Nodes(this.$target, {
      list: this.state.list,
      onClick: async id => {
        const { list, depth } = this.state;
        const selectedNode = list.find(val => val.id === id);
        if (selectedNode.type === 'DIRECTORY') {
          await this.fetch(id);
          this.setState({ depth: [...depth, selectedNode.name] });
        } else {
          this.setState({ filePath: selectedNode.filePath });
        }
      },
      onPrevClick: () => {
        const nodes = [...this.state.nodes];
        const prevIdx = nodes.length - 2;
        const prevList = nodes[prevIdx];
        this.setState({
          list: prevList,
          nodes: nodes.slice(0, prevIdx + 1),
          depth: this.state.depth.slice(0, prevIdx + 1)
        });
      }
    });
    this.ImageViewer = new ImageViewer(document.body, {
      filePath: this.state.filePath,
      onClick: event => {
        if (event.target.nodeName !== 'IMG') {
          this.setState({ filePath: null });
        }
      },
      onKeyDown: event => {
        if (event.key === 'Escape') {
          this.setState({ filePath: null });
        }
      }
    });
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.Nodes.setState({ list: this.state.list });
    this.Breadcrumb.setState({ list: this.state.depth });
    this.ImageViewer.setState({ filePath: this.state.filePath });
  }
}
