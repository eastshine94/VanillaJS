import Component from '../../Component.js';
import SearchInput from '../components/SearchInput.js';
import SelectedLanguage from '../components/SelectedLanguage.js';
import Suggestion from '../components/Suggestion.js';
import { fetchLanguage } from '../lib/api.js';
import { getStorage, setStorage } from '../lib/storage.js';
import { STORAGE_KEY } from '../lib/config.js';

export default class SearchPage extends Component {
  async fetch(keyword) {
    const res = await fetchLanguage({ keyword });
    this.setState({ searchResult: res });
  }
  componentWillMount() {
    this.state = {
      searchResult: [],
      selectHistory: getStorage(STORAGE_KEY).selectHistory ?? []
    };
    this.fetch(getStorage(STORAGE_KEY).search ?? '');
  }
  componentDidMount() {
    const { searchResult, selectHistory } = this.state;
    const handleSearch = async keyword => {
      await this.fetch(keyword);
    };
    const handelSelect = value => {
      const list = [...selectHistory].filter(select => select !== value);
      list.push(value);
      if (list.length > 5) {
        list.shift();
      }
      setStorage(STORAGE_KEY, { selectHistory: list });
      this.setState({ selectHistory: list });
    };
    new SelectedLanguage(document.querySelector('.SelectedLanguage'), {
      list: selectHistory
    });
    new SearchInput(document.querySelector('.SearchInput'), { handleSearch });
    new Suggestion(document.querySelector('.Suggestion'), {
      list: searchResult,
      handelSelect
    });
  }
  template() {
    return `
            <div class="SelectedLanguage"></div>
            <form class="SearchInput"></form>
            <div class="Suggestion"></div>
        `;
  }
}
