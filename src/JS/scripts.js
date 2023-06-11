import { borrarPokemones } from './borrarPokemones.js';
import { buscador } from './buscador.js';
import { listarTodos } from './listarPokemones.js';
import { activar, desactivar } from './util.js';

const botonBuscar = document.getElementById('botonBuscar');
const botonLimpiar = document.getElementById('borrar-pokemones');
const botonListar = document.getElementById('boton-mostrar');

botonBuscar.addEventListener('click', function (e) {
  desactivar();
  e.preventDefault();
  borrarPokemones();
  botonListar.disabled = false;
  const input = document.getElementById('inputPokemon');
  const texto = input.value;
  buscador(texto, botonLimpiar);
});

botonListar.addEventListener('click', l => {
  desactivar();
  borrarPokemones();
  l.preventDefault();
  listarTodos();
  botonListar.disabled = true;
  botonLimpiar.style.display = 'block';
});

botonLimpiar.addEventListener('click', c => {
  activar();
  c.preventDefault();
  borrarPokemones();
  botonListar.disabled = false;
  botonLimpiar.style.display = 'none';
});
