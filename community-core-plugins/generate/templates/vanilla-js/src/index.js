const output = document.getElementById('output');
const incrementButton = document.getElementById('increment-button')

incrementButton.addEventListener('click', () => {
  const currentNumber = Number.parseInt(output.innerText);
  output.innerText = currentNumber + 1;
});