// src/utils/api.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:3006/api'; // Update with the actual base URL

const getHeaders = () => {
  // If you're using token-based authentication, this is where you would add your headers
  return {
    'Content-Type': 'application/json'
    // Authorization: 'Bearer ' + token, // if you have token-based auth
  };
};

export const fetchTeams = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/teams`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch teams:', error);
        throw error;
    }
};

export const createTeam = async (teamData) => {
  return axios.post(`${API_BASE_URL}/teams`, teamData, { headers: getHeaders() });
};

export const getMatches = async () => {
  return axios.get(`${API_BASE_URL}/matches`, { headers: getHeaders() });
};

export const scheduleMatch = async (matchData) => {
  return axios.post(`${API_BASE_URL}/matches`, matchData, { headers: getHeaders() });
};

export const chooseWinner = async (matchId, winnerTeamId) => {
  return axios.patch(`${API_BASE_URL}/matches/${matchId}`, { winnerTeamId }, { headers: getHeaders() });
};

// Add more API functions as needed
