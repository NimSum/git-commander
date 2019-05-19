import React, { Component } from 'react';
import Header from './header/Header';
import GameWindow from './game-interface/GameWindow';
import UserInterface from './user-interface/UserInterface';
import Splash from './splash-page/Splash'
import FeedbackPrompt from './prompts/FeedbackPrompt';

class App extends Component {
  constructor() {
    super();
    this.state = {
      challenges: [],
      currentRound: 1,
      startGame: false,
      playerName: '',
      collide: false,
      resetGame: false,
      inputDisabled: false,
      shoWinnerPrompt: true
    };
  }
  
  componentDidMount() {
    fetch('https://gist.githubusercontent.com/NimSum/f190231f92183f4851074ef2502537c6/raw/783cf14b21ef1138cecfbcb0f17449544041e501/git-commander-challenges')
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

  nextRound = () => {
    this.setState( {
      currentRound: this.state.currentRound + 1
    }, () => 
      this.state.currentRound === 6 && this.setState({
        inputDisabled: true
      })
    )
  }

  toggleCommandInput = (bool) => {
    this.setState({ inputDisabled: bool })
  }

  collide = (bool) => {
    this.setState( {collide: bool, inputDisabled: true}
      , () => setTimeout(() => {
        if (bool) this.setState( {resetGame: true } )
        }, 3000 ))
  }

  resetGame = () => {
    this.setState( {
      resetGame: 'reset',
      currentRound: 1
    }, () => 
      this.setState({
        resetGame: false
      })
    )
  }

  hideWinnerPrompt = () => {
    this.setState({ 
      shoWinnerPrompt: false,
      currentRound: 7 })
  }
  
  render() {
    return !this.state.startGame 
    ? (<div>
        < Splash 
          startGame={ this.startGame }/> 
      </div>)
    : (<div>
        < Header />
        <main>
          < GameWindow 
            currRound={ this.state.currentRound }
            activateCollition={ this.collide }
            { ...this.state }/>
          < UserInterface 
            nextRound={ this.nextRound }
            { ...this.state } 
            activateCollition={ this.collide }/>
          { this.state.resetGame && 
            < FeedbackPrompt 
              reset={ true }
              resetGame={ this.resetGame }
              toggleCommandInput={ this.toggleCommandInput }
            /> }
          { (this.state.currentRound === 6 && this.state.shoWinnerPrompt) &&
            < FeedbackPrompt 
              winner={ true }
              hideWinnerPrompt={ this.hideWinnerPrompt }
              toggleCommandInput={ this.toggleCommandInput }
            /> }
        </main>   
      </div>)
  }
}

export default App;
