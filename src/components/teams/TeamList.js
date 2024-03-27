// TeamList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTeams } from '../../utils/api'; // Adjust the import path as necessary

const TeamList = () => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const getTeams = async () => {
            try {
                const fetchedTeams = await fetchTeams();
                setTeams(fetchedTeams);
            } catch (error) {
                console.error('Failed to fetch teams:', error);
            }
        };

        getTeams();
    }, []); // The empty array means this effect runs once after the initial render

    return (
        <div className="container mt-4">
            <h2>Teams</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Captain Name</th>
                        <th>Team LOB</th>
                        <th>Game</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map(team => (
                        <tr key={team._id}>
                            <td>{team.captainName}</td>
                            <td>{team.teamLOB}</td>
                            <td>{team.game.name}</td>
                            <td>
                                <Link to={`/teams/${team._id}`} className="btn btn-primary btn-sm">View</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/manage/team/new" className="btn btn-primary">Add New Team</Link>
        </div>
    );
};

export default TeamList;
