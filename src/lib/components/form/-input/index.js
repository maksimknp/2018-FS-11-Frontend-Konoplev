import shadowStyles from './shadow.css';

const template = `
  <style>${shadowStyles.toString()}</style>
  <input />
  <slot name="icon"></slot>
`;

// const iconTemplate = `
//  <div class="${styles.icon}" />
// `;

class FormInput extends HTMLElement {
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
    this.elements.hiddenInput[attrName] = newVal;
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
  }

  onInput() {
    this.elements.hiddenInput.value = this.elements.input.value;
  }
}

export default FormInput;
