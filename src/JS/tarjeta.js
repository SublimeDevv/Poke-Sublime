const celdas = document.getElementById('celdas-pokemon');

export const crearTarjeta = async countResults => {
  const crearDiv = document.createElement('div');
  crearDiv.classList.add('tarjeta-pokemon');
  celdas.appendChild(crearDiv);

  const obtenerDiv = document.getElementsByClassName('tarjeta-pokemon')[countResults];

  const crearImg = document.createElement('img');
  crearImg.classList.add('img-pokemon');

  const crearH2 = document.createElement('h2');
  crearH2.classList.add('nombre-pokemon');

  const crearUl = document.createElement('ul');
  crearUl.classList.add('habilidades-pokemon');

  const array = [crearImg, crearH2, crearUl];

  for (let i = 0; i < array.length; i++) {
    obtenerDiv.appendChild(array[i]);
  }
};
