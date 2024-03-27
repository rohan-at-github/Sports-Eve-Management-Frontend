import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Table, Container, Row, Col, Badge } from 'react-bootstrap';
import './MatchDetails.css'; // Assuming you have a CSS file for additional styles
import { useNavigate } from 'react-router-dom';

const MatchDetails = () => {
    const navigate = useNavigate();

  const { matchId } = useParams();
  const [match, setMatch] = useState(null);
  const handleBackClick = () => {
    navigate(-1); // This will take you back to the previous page
  };
  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3006/api/matches/${matchId}`);
        setMatch(response.data);
      } catch (error) {
        console.error('Failed to fetch match details:', error);
      }
    };

    fetchMatchDetails();
  }, [matchId]); 

  const renderTeamCard = (team, teamTitle) => (
    <Card className="team-card">
      <Card.Header as="h5">
        {teamTitle}: <span className="team-name">{team.captainName}</span>
        <span className="team-lob">{team.teamLOB}</span>
      </Card.Header>
      <Card.Body>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Player Name</th>
              <th>SAP ID</th>
            </tr>
          </thead>
          <tbody>
            {team.players.map((player, index) => (
              <tr key={player._id}>
                <td>{index + 1}</td>
                <td>{player.name}</td>
                <td>{player.sapId}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );

  if (!match) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-4 match-details-container">
      <Row className="justify-content-md-center match-summary-header">
        <Col>
          <h1>Match Summary</h1>
          <hr />
         
        </Col>
      </Row>
      <Row className="match-details-row">
        <Col md={5}>
          {renderTeamCard(match.teams[0], 'Team 1')}
        </Col>
        <Col md={2} className="my-auto text-center vs-col">
          <div className="vs-sign">V/S</div>
          <Badge pill bg="info" className="">
            Round: {match.round}
          </Badge>
          <Badge pill bg="success" className="winner-badge">
            Winner: {match.winner ? match.teams.find(team => team._id === match.winner).captainName : 'Pending'}
          </Badge>
        </Col>
        <Col md={5}>
          {renderTeamCard(match.teams[1], 'Team 2')}
        </Col>
      </Row>
      <br></br>
      <Row className="justify-content-md-center">
        <Col>
          <button className="btn btn-secondary" onClick={handleBackClick}>
            ← Back
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default MatchDetails;
