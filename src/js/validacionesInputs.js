//* Emails
const input = document.querySelector('.email');

input.addEventListener('keypress', (event) => {
  const key = event.key;
  const regex = /[0-9a-zA-Záéíóú@.,-]/g;

  if (!regex.test(key)) {
    event.preventDefault();
  }
});


//* SoloLetras
const inputLetras = document.querySelector('.soloLetras');

inputLetras.addEventListener('keypress', (event) => {
  const key = event.key;
  console.key
  const regex = /[a-zA-Záéíóú ]/g;

  if (!regex.test(key)) {
    event.preventDefault();
  }
});