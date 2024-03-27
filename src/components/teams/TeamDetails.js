import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Make sure axios is installed
import UpdatePlayerForm from './UpdatePlayerForm'; // Adjust the import path as necessary

const TeamDetails = () => {
    const { teamId } = useParams();
    const [team, setTeam] = useState(null);
    const [editPlayerId, setEditPlayerId] = useState(null);

    useEffect(() => {
        const getTeamDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3006/api/teams/${teamId}`);
                setTeam(response.data);
            } catch (error) {
                console.error('Failed to fetch team details:', error);
            }
        };

        getTeamDetails();
    }, [teamId]);

    const handleEditClick = (playerId) => {
        setEditPlayerId(playerId);
    };

    if (!team) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <h1>{team.captainName}'s Team</h1>
            <p>Game: {team.game.name}</p>
            <p>LOB: {team.teamLOB}</p>
            <h3>Team Members</h3>
            <table>
                <thead>
                    <tr>
                        <th>Player Name</th>
                        <th>SAP ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {team.players.map(player => (
                        <tr key={player._id}>
                            <td>{player.name}</td>
                            <td>{player.sapId}</td>
                            <td>
                                <button onClick={() => handleEditClick(player._id)}>
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editPlayerId && (
                <div>
                    <h3>Edit Player</h3>
                    <UpdatePlayerForm teamId={teamId} playerId={editPlayerId} />
                </div>
            )}
        </div>
    );
};

export default TeamDetails;
