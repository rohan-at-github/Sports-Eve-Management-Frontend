import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GameListComponent = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('http://localhost:3006/api/games');
        setGames(response.data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };
    fetchGames();
  }, []);

  // Function to summarize rules, you can expand this function based on your PDF content.
  const summarizeRules = (gameName) => {
    switch (gameName.toLowerCase()) {
      case 'chess':
        return 'Each player controls 16 pieces. The game aims to checkmate the opponent’s king.';
      case 'carrom':
        return 'Players take turns to pocket carrom men. The queen is worth five points.';
      // Add summarized rules for other games
      default:
        return 'Refer to the Sportathon guidelines for detailed rules.';
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Games List</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {games.map((game) => (
          <div key={game._id} className="col">
            <div className="card h-100">
              <img src="/path-to-your-image.jpg" className="card-img-top" alt={`${game.name} Image`} />
              <div className="card-body">
                <h5 className="card-title">{game.name}</h5>
                <p className="card-text">{game.description}</p>
                <p className="card-text"><small className="text-muted">{summarizeRules(game.name)}</small></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameListComponent;
