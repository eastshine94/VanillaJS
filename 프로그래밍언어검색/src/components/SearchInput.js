import Component from '../../Component.js';
import { getStorage, setStorage } from '../lib/storage.js';
import { STORAGE_KEY } from '../lib/config.js';

let debounce = null;
export default class SearchInput extends Component {
  onChange(event) {
    const { value } = event.target;
    const { handleSearch } = this.props;
    if (debounce) {
      clearTimeout(debounce);
    }
    debounce = setTimeout(async () => {
      setStorage(STORAGE_KEY, { search: value });
      await handleSearch(value);
    }, 500);
  }
  async componentWillMount() {
    this.state = {
      initKeyword: getStorage(STORAGE_KEY).search ?? ''
    };
  }
  setEvent() {
    const node = document.querySelector('.SearchInput__input');
    this.addEvent('input', node, event => {
      event.preventDefault();
      this.onChange(event);
    });
  }
  componentDidMount() {
    const { initKeyword } = this.state;
    const node = document.querySelector('.SearchInput__input');
    node.value = initKeyword;
    node.selectionStart = node.value.length;
    node.focus();
  }
  template() {
    return `
            <input class="SearchInput__input" type="text" placeholder="프로그램 언어를 입력하세요.">
        `;
  }
}
