import React from 'react';

// This component will later accept props, including details about the game
const GameDetails = ({ game }) => {
  // Placeholder data until we fetch real data from the backend
  
  const placeholderGame = {
    id: 1,
    name: 'Volleyball',
    description: 'A team sport where two teams of six players are separated by a net.',
    teamLimit: 6,
    rules: 'Each team tries to score points by grounding a ball on the other team’s court under organized rules.'
  };

  // Replace `placeholderGame` with `game` once you start fetching real data
  const { name, description, teamLimit, rules } = placeholderGame;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">{name}</h2>
      <p><strong>Description:</strong> {description}</p>
      <p><strong>Team Limit:</strong> {teamLimit} players per team</p>
      <p><strong>Rules:</strong> {rules}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default GameDetails;
