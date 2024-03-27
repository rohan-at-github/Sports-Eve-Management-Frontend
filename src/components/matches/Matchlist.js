import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MatchList = () => {
  const [matches, setMatches] = useState([]);
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('http://localhost:3006/api/games');
        setGames(response.data);
      } catch (error) {
        console.error('Failed to fetch games:', error);
      }
    };

    const fetchMatches = async () => {
      try {
        const response = await axios.get('http://localhost:3006/api/matches');
        setMatches(response.data);
      } catch (error) {
        console.error('Failed to fetch matches:', error);
      }
    };

    fetchGames();
    fetchMatches();
  }, []);

  // Utility function to find a game's name by its ID
  const findGameNameById = (gameId) => {
    const game = games.find((g) => g._id === gameId);
    return game ? game.name : 'Game info not available';
  };

  return (
    <div className="container mt-4">
      <h2>Match List</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Match</th>
              <th scope="col">Game Name</th>
              <th scope="col">Round</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match, index) => (
              <tr key={match._id}>
                <th scope="row">{index + 1}</th>
                <td>{match.teams[0].captainName} vs {match.teams[1].captainName}</td>
                <td>{findGameNameById(match.game)}</td>
                <td>Round {match.round}</td>
                <td>
                  <Link to={`/matches/${match._id}`} className="btn btn-primary">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MatchList;
