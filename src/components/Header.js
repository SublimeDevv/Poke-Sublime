import React, { useState } from 'react';

function Header({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <header>
      <h1>SUBLIME POKE</h1>
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand"></a>
        <form className="form-inline" onSubmit={handleSubmit}>
          <input
            id="inputPokemon"
            className="form-control mr-sm-2"
            type="search"
            placeholder="Nombre Pokémon"
            aria-label="Nombre Pokémon"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button id="botonBuscar" className="btn btn-warning" type="submit">
            Buscar
          </button>
        </form>
      </nav>
    </header>
  );
}

export default Header;
