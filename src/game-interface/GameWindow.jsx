import React, { Component } from 'react'
import { ProgressIndicator } from './ProgressIndicator';

export class GameWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shipPosition: 1,
      clearPath: Math.round(Math.random() * (5 - 1) + 1),
      obstaclePositions: [1, 2, 3, 4, 5]
    }
  }

  generateObstacles() {
    const obstacleContainer = []
    for (let i = 0; i <= this.props.currRound; i++) {
      obstacleContainer.push(
        ( <img 
          className={`obstacle obstacle-pos-${i+1}${Math.round(Math.random())}`}
          src="http://clipart-library.com/image_gallery/n756983.gif" 
          alt="obstacle" />)
      )
    }
    return obstacleContainer;
  }

  render() {
    return (
      <section className="game-window">
        {this.generateObstacles()}
        <img 
          className={`octo-ship ship-position-${this.state.shipPosition}` }
          src={ require("../images/jetpacktocat.png") }
          alt="obstacle" />
        < ProgressIndicator 
          currRound={ this.props.currRound } />
      </section>
    )
  }
}

export default GameWindow
