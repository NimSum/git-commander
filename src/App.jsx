import React, { Component } from 'react';
import Header from './header/Header';
import GameWindow from './game-interface/GameWindow';
import UserInterface from './user-interface/UserInterface';
import Splash from './splash-page/Splash'

class App extends Component {
  constructor() {
    super();
    this.state = {
      challenges: [],
      currentRound: 1,
      startGame: false,
      playerName: ''
    }
  }
  
  componentDidMount() {
    fetch('https://gist.githubusercontent.com/NimSum/f190231f92183f4851074ef2502537c6/raw/037ac94f752839244fc3781bd47fee1d81a12c71/git-commander-challenges')
      .then(challenges => challenges.json())
      .then(challenges => this.setState({challenges: challenges}))
      .catch(error => { throw new Error(error) })
  }

  startGame = (playerName) => {
    this.setState({
      startGame: true,
      playerName: playerName
    })
  }

  render() {
    return (
      <div>
        < Header />
        { !this.state.startGame && 
          < Splash 
            startGame={ this.startGame }/> }
        { this.state.startGame && 
          (<main>
            < GameWindow />
            < UserInterface 
              {...this.state}
            />
          </main>) }    
      </div>
    );
  }
}

export default App;