import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';
import './App.css';
import logo from './trivia.png';
import FeedBack from './pages/FeedBack';

function App() {
  return (
    <section className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/game" component={ Game } />
          <Route exact path="/settings" component={ Settings } />
          <Route exact path="/feedback" component={ FeedBack } />
        </Switch>
      </header>
    </section>
  );
}

export default App;
// primeiro commit
