import FormInput from '../form/-input'; // eslint-disable-line
import shadowStyles from './shadow.css';

const template = `
<style>${shadowStyles.toString()}</style>
  <ul class="result"></ul>
    <form>
      <form-input class="message-input" name="message_text" placeholder="Сообщение" slot="message-input">
        <span slot="icon"></span>
      </form-input>
    </form>
`;

export default class MessageForm extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({
      mode: 'open',
    });
    shadowRoot.innerHTML = template;
    this.initElements();
    this.addHandlers();
  }

  static get observedAttributes() {
    return [
      'action',
      'method',
    ];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this.elements.form[attrName] = newVal;
  }

  initElements() {
    const form = this.shadowRoot.querySelector('form');
    const messages = this.shadowRoot.querySelector('.result');
    this.elements = {
      form,
      messages,
    };
    this.savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    this.showMessages();
  }

  addHandlers() {
    this.elements.form.addEventListener('submit', this.onSubmit.bind(this));
    this.elements.form.addEventListener('keypress', this.onKeyPress.bind(this));
  }

  onSubmit(event) {
    event.preventDefault();
    this.savedMessages.push(this.elements.form.elements[0].value);
    this.showMessages();
    // this.clearField();
    return false;
  }

  showMessages() {
    localStorage.setItem('messages', JSON.stringify(this.savedMessages));
    this.elements.messages.innerHTML = this.savedMessages.map(message => `<li>${message}</li>`).join('');
  }

  onKeyPress(event) {
    if (event.keyCode === 13) {
      this.elements.form.dispatchEvent(new Event('submit'));
    }
  }

  clearField() {
    this.elements.form.elements[0].dispatchEvent(new CustomEvent('clear-field'));
  }
}
