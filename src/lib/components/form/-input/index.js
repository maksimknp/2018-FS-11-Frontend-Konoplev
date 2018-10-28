import shadowStyles from './shadow.css';

const template = `
  <style>${shadowStyles.toString()}</style>
  <input />
  <slot name="icon"></slot>
`;

// const iconTemplate = `
//  <div class="${styles.icon}" />
// `;

export default class FormInput extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = template;
    this.initElements();
    this.addHandlers();
  }

  static get observedAttributes() {
    return [
      'name',
      'placeholder',
      'value',
      'disabled',
    ];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this.elements.input[attrName] = newVal;
  }

  initElements() {
    const hiddenInput = document.createElement('input');
    const input = this.shadowRoot.querySelector('input');
    this.appendChild(hiddenInput);
    this.elements = {
      input,
      hiddenInput,
    };
  }

  addHandlers() {
    this.elements.input.addEventListener('input', this.onInput.bind(this));
    this.addEventListener('clear-field', this.clearInput.bind(this));
  }

  onInput() {
    this.elements.hiddenInput.value = this.elements.input.value;
  }

  clearInput() {
    this.elements.input.value = '';
    this.elements.hiddenInput.value = '';
  }
}
