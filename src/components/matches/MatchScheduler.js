// MatchScheduler.js

import React, { useState } from 'react';

const MatchScheduler = ({ onSave }) => {
    // Mock data for games
    const games = [
        { id: 'vball', name: 'Volleyball' },
        { id: 'futsal', name: 'Futsal' },
        // ...other games
    ];

    // Mock data for teams
    const teams = {
        vball: ['Team Spikers', 'Team Blockers'],
        futsal: ['Team Strikers', 'Team Goalers'],
        // ...teams for other games
    };

    // Mock data for available time slots
    const slots = [
        '2024-06-20T10:00',
        '2024-06-20T12:00',
        // ...other time slots
    ];

    const [selectedGame, setSelectedGame] = useState('');
    const [selectedTeam1, setSelectedTeam1] = useState('');
    const [selectedTeam2, setSelectedTeam2] = useState('');
    const [selectedSlot, setSelectedSlot] = useState('');

    const handleGameChange = (event) => {
        setSelectedGame(event.target.value);
        // Reset teams when game changes
        setSelectedTeam1('');
        setSelectedTeam2('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedTeam1 === selectedTeam2) {
            alert("A team cannot play against itself. Please select different teams.");
            return;
        }
        const newMatch = {
            game: selectedGame,
            teams: [selectedTeam1, selectedTeam2],
            slot: selectedSlot,
        };
        onSave(newMatch);
        // You would also post this information to your backend to save it
        alert('Match scheduled successfully!'); // For mockup purposes
    };

    return (
        <div className="container mt-4">
            <h2>Schedule a Match</h2>
            <form onSubmit={handleSubmit}>
                {/* Select Game */}
                <div className="mb-3">
                    <label htmlFor="game" className="form-label">Select Game</label>
                    <select id="game" className="form-select" value={selectedGame} onChange={handleGameChange} required>
                        <option value="">Select a game</option>
                        {games.map(game => <option key={game.id} value={game.id}>{game.name}</option>)}
                    </select>
                </div>

                {/* Select Team 1 */}
                <div className="mb-3">
                    <label htmlFor="team1" className="form-label">Select Team 1</label>
                    <select id="team1" className="form-select" value={selectedTeam1} onChange={e => setSelectedTeam1(e.target.value)} required>
                        <option value="">Select Team 1</option>
                        {selectedGame && teams[selectedGame].map(team => <option key={team} value={team}>{team}</option>)}
                    </select>
                </div>

                {/* Select Team 2 */}
                <div className="mb-3">
                    <label htmlFor="team2" className="form-label">Select Team 2</label>
                    <select id="team2" className="form-select" value={selectedTeam2} onChange={e => setSelectedTeam2(e.target.value)} required>
                        <option value="">Select Team 2</option>
                        {selectedGame && teams[selectedGame].map(team => <option key={team} value={team}>{team}</option>)}
                    </select>
                </div>

                {/* Select Time Slot */}
                <div className="mb-3">
                    <label htmlFor="slot" className="form-label">Select Time Slot</label>
                    <select id="slot" className="form-select" value={selectedSlot} onChange={e => setSelectedSlot(e.target.value)} required>
                        <option value="">Select a slot</option>
                        {slots.map(slot => <option key={slot} value={slot}>{new Date(slot).toLocaleString()}</option>)}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">Schedule Match</button>
            </form>
        </div>
    );
};

export default MatchScheduler;
