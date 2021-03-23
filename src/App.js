import React from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Game from './components/Game/game';
import Scoreboard from './components/Scoreboard/Scoreboard';


const appHeight = () => {
  const doc = document.documentElement
  doc.style.setProperty('--app-height', `${window.innerHeight}px`);
  doc.style.setProperty('--app-width', `${window.innerWidth}px`)
}
window.addEventListener('resize', appHeight)
appHeight();

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
