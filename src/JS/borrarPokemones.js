export const borrarPokemones = () => {
  const checarLista = document.getElementsByClassName('tarjeta-pokemon');
  if (checarLista.length >= 0) {
    const checarCeldas = document.getElementById('celdas-pokemon');
    while (checarCeldas.firstChild) {
      checarCeldas.removeChild(checarCeldas.firstChild);
    }
  }
};
