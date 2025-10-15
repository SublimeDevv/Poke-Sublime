import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import PokemonCard from './components/PokemonCard';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showInitial, setShowInitial] = useState(true);
  const [showError, setShowError] = useState(false);
  const [showClearButton, setShowClearButton] = useState(false);

  useEffect(() => {
    fetchAllPokemonsList();
  }, []);

  const fetchAllPokemonsList = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1010&offset=0');
      const data = await response.json();
      setAllPokemons(data.results);
    } catch (error) {
      console.error('Error fetching pokemon list:', error);
    }
  };

  const filterPokemons = (searchTerm) => {
    if (!searchTerm || searchTerm.trim() === '') {
      return [];
    }

    const searchLower = searchTerm.toLowerCase().replace(/\s/g, '');
    const searchChars = searchLower.split('');

    return allPokemons.filter(pokemon => {
      const pokemonName = pokemon.name.toLowerCase();
      return searchChars.every(char => pokemonName.includes(char));
    });
  };

  const handleSearch = async (searchTerm) => {
    setShowInitial(false);
    setShowError(false);
    setShowClearButton(false);

    if (!searchTerm || searchTerm.trim() === '') {
      setPokemons([]);
      setShowInitial(true);
      return;
    }

    setLoading(true);
    const filtered = filterPokemons(searchTerm);

    if (filtered.length > 0) {
      const pokemonDetails = await Promise.all(
        filtered.map(async (pokemon) => {
          try {
            const response = await fetch(pokemon.url);
            return await response.json();
          } catch (error) {
            console.error('Error fetching pokemon details:', error);
            return null;
          }
        })
      );
      setPokemons(pokemonDetails.filter(p => p !== null));
      setShowClearButton(true);
      setShowError(false);
    } else {
      setPokemons([]);
      setShowError(true);
      setShowClearButton(false);
    }

    setLoading(false);
  };

  const handleShowAll = async () => {
    setShowInitial(false);
    setShowError(false);
    setLoading(true);

    try {
      const pokemonDetails = await Promise.all(
        allPokemons.map(async (pokemon) => {
          try {
            const response = await fetch(pokemon.url);
            return await response.json();
          } catch (error) {
            console.error('Error fetching pokemon details:', error);
            return null;
          }
        })
      );
      setPokemons(pokemonDetails.filter(p => p !== null));
      setShowClearButton(true);
    } catch (error) {
      console.error('Error loading all pokemons:', error);
    }

    setLoading(false);
  };

  const handleClear = () => {
    setPokemons([]);
    setShowInitial(true);
    setShowError(false);
    setShowClearButton(false);
  };

  return (
    <div className="App">
      <Header onSearch={handleSearch} />
      
      <main id="principal">
        <div id="buttonsCtl">
          <button 
            id="boton-mostrar" 
            type="button" 
            className="btn btn-primary"
            onClick={handleShowAll}
            disabled={loading}
          >
            <i className="nf nf-md-eye"></i> Mostrar todos los Pokémones
          </button>
          
          {showClearButton && (
            <button 
              id="borrar-pokemones" 
              type="button" 
              className="btn btn-danger"
              onClick={handleClear}
            >
              <i className="nf nf-md-delete"></i> Limpiar lista de Pokémones
            </button>
          )}
        </div>

        {showInitial && (
          <div id="inicioImg">
            <h2><i className="nf nf-md-pokeball"></i></h2>
          </div>
        )}

        {showError && (
          <div id="sin-resultados">
            <h2><i className="nf nf-cod-error"> Sin resultados</i></h2>
          </div>
        )}

        {loading && (
          <div className="loading">
            <h2>Cargando...</h2>
          </div>
        )}

        <div id="celdas-pokemon">
          {pokemons.map((pokemon, index) => (
            <PokemonCard key={index} pokemon={pokemon} />
          ))}
        </div>
      </main>

      <footer>
        <p>Desarrollado con PokeAPI</p>
      </footer>
    </div>
  );
}

export default App;
