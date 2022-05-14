import Component from '../../Component.js';

export default class SelectedLanguage extends Component {
  template() {
    const { list } = this.props;
    return `
            <ul>
                ${list.map(val => `<li>${val}</li>`).join('')}
            </ul>
        `;
  }
}
