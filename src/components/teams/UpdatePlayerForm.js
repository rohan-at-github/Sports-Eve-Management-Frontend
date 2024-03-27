import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdatePlayerForm = ({ teamId, playerId }) => {
  const [playerDetails, setPlayerDetails] = useState({
    originalSapId: '', // Will be populated with the player's current SAP ID
    updatedPlayer: {
      name: '', // New name to update
      sapId: '' // New SAP ID to update
    },
    gameId: '' // ID of the game the team is associated with
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch the current player details and the game ID from the backend
    // and populate the state
    const fetchPlayerDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3006/api/teams/${teamId}`);
        const teamData = response.data;
        const player = teamData.players.find(p => p._id === playerId);
        setPlayerDetails({
          originalSapId: player.sapId,
          updatedPlayer: { name: player.name, sapId: player.sapId },
          gameId: teamData.game._id // Assuming game ID is available in the response
        });
      } catch (error) {
        setMessage(`Failed to fetch player details. Error: ${error.message}`);
      }
    };

    fetchPlayerDetails();
  }, [teamId, playerId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPlayerDetails({
      ...playerDetails,
      updatedPlayer: { ...playerDetails.updatedPlayer, [name]: value }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.patch(`http://localhost:3006/api/teams/updatePlayer/${teamId}`, {
        sapId: playerDetails.originalSapId, // Use original SAP ID here
        updatedPlayer: playerDetails.updatedPlayer,
        gameId: playerDetails.gameId // Include gameId in the request
      });
      setMessage('Player updated successfully!');
      // Optionally reset the form or handle the update
    } catch (error) {
      setMessage(`Failed to update player. Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h3>Update Player</h3>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Player Name"
          name="name"
          value={playerDetails.updatedPlayer.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          placeholder="SAP ID"
          name="sapId"
          value={playerDetails.updatedPlayer.sapId}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Update Player</button>
      </form>
    </div>
  );
};

export default UpdatePlayerForm;
