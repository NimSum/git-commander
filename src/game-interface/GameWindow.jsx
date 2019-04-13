import React, { Component } from 'react'
import { ProgressIndicator } from './ProgressIndicator';

export class GameWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shipPosition: 4
    }
  }
  render() {
    return (
      <section className="game-window">
        <img className="obstacle" src="http://clipart-library.com/image_gallery/n756983.gif" alt="obstacle" />
        <img 
          className="octo-ship" 
          src={ require("../images/jetpacktocat.png") }
          alt="obstacle" />
        < ProgressIndicator 
          currRound={ this.props.currRound } />
      </section>
    )
  }
}

export default GameWindow
