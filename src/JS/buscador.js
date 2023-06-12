import { editarTarjeta } from './editarTarjeta.js';
import { crearTarjeta } from './tarjeta.js';
import { configBoton, filtroBusqueda, msgError } from './util.js';
const pokeball = document.getElementById('inicioImg');

export const buscador = async (busqueda, botonLimpiar) => {
  if (!busqueda || busqueda.split(' ').join('') === '') {
    msgError('none');
    configBoton(pokeball, 'grid');
    return;
  }

  const apiPoke = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1010&offset=0');
  const response = await apiPoke.json();
  const listaPokemones = await response.results;

  const buscarPokemon = filtroBusqueda(listaPokemones, busqueda);

  if (buscarPokemon.length >= 1) {
    for (let i = 0; i < buscarPokemon.length; i++) {
      crearTarjeta(i);
      editarTarjeta(buscarPokemon[i], i);
    }
    configBoton(botonLimpiar, 'block')
    msgError('none')
  } else {
    configBoton(botonLimpiar, 'none')
    msgError('grid')
  }
};

//const buscarPokemon = listaPokemones.filter(w => similarPokemon(w.name, busqueda));
//const buscarPokemon = listaPokemones.filter(w => w.name.includes(busqueda.split(' ').join('').toLowerCase()));