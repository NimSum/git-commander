import React, { Component } from 'react';
import Header from './header/Header';
import GameWindow from './game-interface/GameWindow';
import UserInterface from './user-interface/UserInterface';

class App extends Component {
  constructor() {
    super();
    this.state = {

    }
  }
  render() {
    return (
      <div>
        < Header />
        <main>
          < GameWindow />
          < UserInterface />
        </main>
      </div>
    );
  }
}

export default App;
