export default function say(name) {
  const block = document.createElement('div');
  block.classList.add('message');

  const text = document.createElement('p');
  text.textContent = `Hello, ${name}!`;

  block.appendChild(text);
  document.body.appendChild(block);
}
