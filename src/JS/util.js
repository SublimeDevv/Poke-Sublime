const mensajeError = document.getElementById('sin-resultados');

export const configBoton = (boton, dis) => {
  boton.style.display = dis;
};

export const filtroBusqueda = (listaPokemones, busqueda) => {
  const filtrarPorCaracteres = listaPokemones.filter(w => {
    const minusculaPokemon = w.name.toLowerCase();
    const busquedaMinuscula = busqueda.split(' ').join('').toLowerCase();
    const separarBusqueda = busquedaMinuscula.split('');

    return separarBusqueda.every(l => minusculaPokemon.includes(l));
  });

  return filtrarPorCaracteres;
};

export const msgError = (p) => {
  mensajeError.style.display = p;
}