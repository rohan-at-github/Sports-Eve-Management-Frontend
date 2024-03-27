// WinnersList.js

import React from 'react';

const WinnersList = ({ matches }) => {
  // Add a guard clause to handle undefined matches
  if (!matches) {
    return <div>Loading matches...</div>;
  }

  const matchesWithWinners = matches.filter(match => match.winner);

  return (
    <div className="container mt-4">
      <h2>Winners List</h2>
      <ul className="list-group">
        {matchesWithWinners.map(match => (
          <li key={match.id} className="list-group-item">
            {match.game}: {match.teams.join(' vs ')} - Winner: {match.winner}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WinnersList;
