import React from 'react';

function PokemonCard({ pokemon }) {
  if (!pokemon) return null;

  return (
    <div className="tarjeta-pokemon">
      <img 
        className="img-pokemon" 
        src={pokemon.sprites.front_default} 
        alt={pokemon.name}
      />
      <h2 className="nombre-pokemon">
        {pokemon.name}
        <i className="nf nf-md-pokeball"></i>
      </h2>
      <h3 className="text-habilidades">
        Habilidades
        <i className="nf nf-fa-magic"></i>
      </h3>
      <ul className="habilidades-pokemon">
        {pokemon.abilities.map((ability, index) => (
          <li key={index}>{ability.ability.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonCard;
