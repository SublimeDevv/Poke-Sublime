import { borrarPokemones } from './borrarPokemones.js';
import { buscador } from './buscador.js';
import { listarTodos } from './listarPokemones.js';
import { configBoton, msgError } from './util.js';

const botonBuscar = document.getElementById('botonBuscar');
const botonLimpiar = document.getElementById('borrar-pokemones');
const botonListar = document.getElementById('boton-mostrar');
const pokeball = document.getElementById('inicioImg');


botonBuscar.addEventListener('click', function (e) {
  configBoton(pokeball, 'none')
  e.preventDefault();
  borrarPokemones();
  botonListar.disabled = false;
  const input = document.getElementById('inputPokemon');
  const texto = input.value;
  buscador(texto, botonLimpiar);
});

botonListar.addEventListener('click', l => {
  msgError('none')
  configBoton(pokeball, 'none')
  borrarPokemones();
  l.preventDefault();
  listarTodos();
  botonListar.disabled = true;
  configBoton(botonLimpiar, 'block')
});

botonLimpiar.addEventListener('click', c => {
  configBoton(pokeball, 'grid')
  c.preventDefault();
  borrarPokemones();
  botonListar.disabled = false;
  configBoton(botonLimpiar, 'none')
});
