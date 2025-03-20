import React from 'react';
import '../styles/globals.css';

const CharacterList = ({ characters }) => {
  return (
    <div className="character-list">
      {characters.map((character) => (
        <div key={character.id} className="character-card">
          <img src={character.image} alt={character.name} className="character-image" />
          <h2 className="character-name">{character.name}</h2>
          <p className="character-status">Status: {character.status}</p>
          <p className="character-species">Species: {character.species}</p>
          <p className="character-origin">Origin: {character.origin.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CharacterList;