const pokeball = document.getElementById('inicioImg');

export const activar = () => {
  pokeball.style.display = 'grid';
};

export const desactivar = () => {
  pokeball.style.display = 'none';
};
