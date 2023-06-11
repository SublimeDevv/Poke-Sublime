import { editarTarjeta } from './editarTarjeta.js';
import { crearTarjeta } from './tarjeta.js';

export const listarTodos = async () => {
  const apiPoke = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1010&offset=0');
  const response = await apiPoke.json();

  const listaPokemones = await response.results;
  for (let i = 0; i < listaPokemones.length; i++) {
    crearTarjeta(i);
    editarTarjeta(listaPokemones[i], i);
  }
};