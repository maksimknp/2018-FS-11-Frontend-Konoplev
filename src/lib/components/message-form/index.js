import shadowStyles from './shadow.css';

// const slotName = 'message-input';

const template = `
<style>${shadowStyles.toString()}</style>
<form>
  <div class="result"></div>
  <form-input name="message_text" placeholder="Введите сообщеине" slot="message-input">
    <span slot="icon"></span>
  </form-input>
</form>
`;

class MessageForm extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
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
    const message = this.shadowRoot.querySelector('.result');
    this.elements = {
      form,
      message,
    };
  }

  addHandlers() {
    this.elements.form.addEventListener('submit', this.onSubmit.bind(this));
    this.elements.form.addEventListener('keypress', this.onKeyPress.bind(this));
  }

  onSubmit(event) {
    this.elements.message.innerText = Array.from(this.elements.form.elements).map(el => el.value).join(', ');
    event.preventDefault();
    return false;
  }

  onKeyPress(event) {
    if (event.keyCode === 13) {
      this.elements.form.dispatchEvent(new Event('submit'));
    }
  }
}

customElements.define('message-form', MessageForm);
