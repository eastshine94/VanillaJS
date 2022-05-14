import Component from '../../Component.js';
import { getStorage } from '../lib/storage.js';
import { STORAGE_KEY } from '../lib/config.js';

export default class Suggestion extends Component {
  componentWillMount() {
    this.state = {
      selectedIdx: 0
    };
    const { list } = this.props;
    this.$target.style.display = list.length > 0 ? 'block' : 'none';
  }

  setEvent() {
    const { list } = this.props;
    const { handelSelect } = this.props;
    const handleKeyDown = event => {
      const { selectedIdx } = this.state;
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        const nextIdx = selectedIdx + 1 < list.length ? selectedIdx + 1 : 0;
        this.setState({ selectedIdx: nextIdx });
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        const nextIdx =
          selectedIdx - 1 >= 0 ? selectedIdx - 1 : list.length - 1;
        this.setState({ selectedIdx: nextIdx });
      } else if (event.key === 'Enter') {
        event.preventDefault();
        handelSelect(list[selectedIdx]);
        window.alert(list[selectedIdx]);
      }
    };

    this.addEvent(
      'keydown',
      document.querySelector('.SearchInput__input'),
      handleKeyDown
    );
  }

  componentDidMount() {
    const { list } = this.props;
    const { handelSelect } = this.props;
    const handleClick = event => {
      event.preventDefault();
      const { idx } = event.currentTarget.dataset;
      const text = list[idx];
      handelSelect(text);
      window.alert(text);
    };
    const elements = this.$target.querySelector('ul').querySelectorAll('li');
    elements.forEach(ele => {
      this.addEvent('click', ele, handleClick);
    });
  }
  template() {
    const { selectedIdx } = this.state;
    const { list } = this.props;
    const search = getStorage(STORAGE_KEY).search ?? '';
    return `
            <ul>
                ${list
                  .map((str, idx) => {
                    const regExp = new RegExp(search, 'gi');
                    const editStr = str.replace(
                      regExp,
                      prev =>
                        `<span class="Suggestion__item--matched">${prev}</span>`
                    );
                    const li =
                      idx === selectedIdx
                        ? `<li class="Suggestion__item--selected" data-idx=${idx}>`
                        : `<li data-idx=${idx}>`;
                    return `${li}${editStr}</li>`;
                  })
                  .join('')}
            </ul>
        `;
  }
}
