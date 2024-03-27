import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeamForm = () => {
    const [team, setTeam] = useState({
        captainName: '',
        teamLOB: '',
        game: '',
        players: [{ name: '', sapId: '' }]
    });
    const [games, setGames] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch the games on component mount
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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTeam({ ...team, [name]: value });
    };

    const handlePlayerChange = (index, event) => {
        const { name, value } = event.target;
        const newPlayers = [...team.players];
        newPlayers[index] = { ...newPlayers[index], [name]: value };
        setTeam({ ...team, players: newPlayers });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3006/api/teams', team);
            setMessage('Team created successfully!');
            // Optionally reset the form or redirect the user
            setTeam({ captainName: '', teamLOB: '', game: '', players: [{ name: '', sapId: '' }] });
        } catch (error) {
            setMessage('Failed to create team. Error: ' + error.message);
        }
    };

    const addPlayerField = () => {
        if (team.players.length < 6) {
            setTeam({ ...team, players: [...team.players, { name: '', sapId: '' }] });
        } else {
            setMessage('You cannot add more than 6 players.');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Add New Team</h2>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="captainName" className="form-label">Captain Name</label>
                    <input type="text" className="form-control" id="captainName" name="captainName" value={team.captainName} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="teamLOB" className="form-label">Team LOB</label>
                    <input type="text" className="form-control" id="teamLOB" name="teamLOB" value={team.teamLOB} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="game" className="form-label">Game</label>
                    <select className="form-control" id="game" name="game" value={team.game} onChange={handleInputChange} required>
                        <option value="">Select Game</option>
                        {games.map((game) => (
                            <option key={game._id} value={game._id}>{game.name}</option>
                        ))}
                    </select>
                </div>
                {team.players.map((player, index) => (
                    <div key={index} className="mb-2">
                        <input type="text" className="form-control mb-1" placeholder="Player Name" name="name" value={player.name} onChange={(e) => handlePlayerChange(index, e)} required />
                        <input type="text" className="form-control" placeholder="SAP ID" name="sapId" value={player.sapId} onChange={(e) => handlePlayerChange(index, e)} required />
                    </div>
                ))}
                <button type="button" onClick={addPlayerField} className="btn btn-secondary mb-3" disabled={team.players.length >= 6}>
                    Add Player
                </button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default TeamForm;
