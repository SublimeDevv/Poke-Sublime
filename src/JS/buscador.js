import { editarTarjeta } from './editarTarjeta.js';
import { crearTarjeta } from './tarjeta.js';
import { activar, desactivar } from './util.js';

export const buscador = async (busqueda, botonLimpiar) => {
  if (!busqueda || busqueda.split(' ').join('') === '') {
    activar();
    botonLimpiar.style.display = 'none';
    return;
  }

  const apiPoke = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1010&offset=0');
  const response = await apiPoke.json();
  const listaPokemones = await response.results;

  const buscarPokemon = listaPokemones.filter(w => w.name.includes(busqueda.split(' ').join('').toLowerCase()))[0];
  const buscarTarjeta = document.getElementsByClassName('tarjeta-pokemon')[0];

  if (buscarPokemon) {
    if (buscarTarjeta) {
      editarTarjeta(buscarPokemon, 0);
    } else {
      crearTarjeta(0);
      editarTarjeta(buscarPokemon, 0);
    }
    botonLimpiar.style.display = 'block';
  } else {
    botonLimpiar.style.display = 'none';
  }
};
