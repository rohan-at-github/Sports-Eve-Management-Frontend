// Dashboard.js

import React from 'react';
import { Link } from 'react-router-dom';

const DashboardComponent = () => {
  // Mock data for the dashboard
  const stats = {
    totalTeams: 20,
    gamesPlayed: 50,
    upcomingMatches: 5,
    totalGames: 10,
  };

  const upcomingGames = [
    { id: 1, name: 'Volleyball', date: '2024-05-20' },
    { id: 2, name: 'Futsal', date: '2024-05-22' },
    // Add more games
  ];

  const recentResults = [
    { id: 1, game: 'Kho Kho', winner: 'Team A', date: '2024-05-18' },
    { id: 2, game: 'Box Cricket', winner: 'Team C', date: '2024-05-17' },
    // Add more results
  ];

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Dashboard</h1>
      <div className="row g-4">
        {/* Quick Stats */}
        <div className="col-12 col-lg-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Quick Stats</h5>
              <p className="card-text">Total Teams: {stats.totalTeams}</p>
              <p className="card-text">Games Played: {stats.gamesPlayed}</p>
              <p className="card-text">Upcoming Matches: {stats.upcomingMatches}</p>
              <p className="card-text">Total Games: {stats.totalGames}</p>
            </div>
          </div>
        </div>

        {/* Upcoming Games */}
        <div className="col-12 col-lg-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Upcoming Games</h5>
              <ul className="list-group list-group-flush">
                {upcomingGames.map((game) => (
                  <li key={game.id} className="list-group-item">
                    {game.name} - <small>{game.date}</small>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Recent Results */}
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Recent Results</h5>
              <ul className="list-group list-group-flush">
                {recentResults.map((result) => (
                  <li key={result.id} className="list-group-item">
                    {result.game} - Winner: {result.winner} <small>({result.date})</small>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Quick Actions</h5>
              <Link to="/manage/team/new" className="btn btn-primary me-2">Add New Team</Link>
              <Link to="/manage/game/new" className="btn btn-secondary">Add New Game</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
