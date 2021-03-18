import React from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Game from './components/Game/game';
import Scoreboard from './components/Scoreboard/Scoreboard';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/game" component={Game}></Route>
            <Route path="/scoreboard" component={Scoreboard}></Route>
            <Route path="/" exact component={Login}></Route>
          </Switch>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
