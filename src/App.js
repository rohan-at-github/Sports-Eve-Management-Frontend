  import React from 'react';
  import { Routes, Route } from 'react-router-dom';
  import TeamList from './components/teams/TeamList';
  import TeamDetails from './components/teams/TeamDetails';
  import TeamForm from './components/teams/TeamForm';
  import GameDetails from './components/games/GameDetails';
  import NavBarComponent from './components/common/Header';
  import 'bootstrap/dist/css/bootstrap.min.css';
import GameListComponent from './components/games/GameList';
import DashboardComponent from './components/Dashboard';
import MatchSchedulerComponent from './components/matches/MatchScheduler';
import MatchList from './components/matches/Matchlist';
import WinnersList from './components/winners/WinnerList';
import MatchDetails from './components/matches/MatchDetails';
  // Import other components as necessary

  function App() {
    return (
      <div>
        
        {/* Your app's layout, like header or navbar, goes here */}
        <NavBarComponent></NavBarComponent>
        <Routes>
          <Route path='/' element={<DashboardComponent />} />
          <Route path="/teams" element={<TeamList />} />
          <Route path="/teams/:teamId" element={<TeamDetails />} />
          {/* <Route path="/manage/team" element={<TeamForm />} /> */}
          <Route path="/games" element={<GameListComponent />} />
          <Route path="/matches" element={<MatchList />} />

          <Route path="/games/:gameId" element={<GameDetails />} />
          <Route path="/manage/team/new" element={<TeamForm />} />
          <Route path="/manage/match/schedules" element={<MatchSchedulerComponent />} />
          <Route path="/winners" element={<WinnersList />} />
          <Route path="/matches/:matchId" element={<MatchDetails />} />


          {/* Define other routes as needed */}
        </Routes>
      </div>
    );
  }

  export default App;
