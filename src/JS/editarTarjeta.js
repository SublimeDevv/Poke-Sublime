export const editarTarjeta = async (buscarPokemon, count) => {
  const imgPokemon = document.getElementsByClassName('img-pokemon')[count];
  const nombrePokemon = document.getElementsByClassName('nombre-pokemon')[count];
  const tituloHabilidades = document.getElementsByClassName('text-habilidades')[count];
  const habilidadesPokemon = document.getElementsByClassName('habilidades-pokemon')[count];

  const infoPokemon = await fetch(buscarPokemon.url);
  const datosPokemon = await infoPokemon.json();
  imgPokemon.src = datosPokemon.sprites.front_default;

  const crearI = document.createElement('i');
  crearI.classList.add('nf');
  crearI.classList.add('nf-md-pokeball');
  nombrePokemon.textContent = datosPokemon.name;

  const crearI2 = document.createElement('i');
  crearI2.classList.add('nf');
  crearI2.classList.add('nf-fa-magic')
  tituloHabilidades.textContent = 'Habilidades';

  nombrePokemon.appendChild(crearI);
  tituloHabilidades.appendChild(crearI2);

  habilidadesPokemon.innerHTML = '';

  datosPokemon.abilities.forEach(a => {
    const obtenerHabilidades = document.createElement('li');
    obtenerHabilidades.textContent = a.ability.name;
    habilidadesPokemon.appendChild(obtenerHabilidades);
  });
};
