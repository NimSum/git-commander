import React, { Component } from 'react'
import { ProgressIndicator } from './ProgressIndicator';

export class GameWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clearPath: Math.round(Math.random() * (5 - 1) + 1),
      obstacles: [],
      obstaclePositions: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.currRound !== nextProps) {
      this.generateObstacles();
    }
  }

  componentDidMount() {
    this.generateObstacles();
  }

  generateObstacles() {
    const obstacles = [];
    const obstaclePositions = [];
    for (let i = 0; i <= this.props.currRound + 2; i++) {
      let randomLocation = Math.round(Math.random() * (5 - 1) + 1);
      let position = this.state.clearPath === randomLocation
        ? randomLocation + 1 + Math.round(Math.random()).toString()
        : randomLocation + Math.round(Math.random()).toString();
      obstaclePositions.push(position);
      obstacles.push(
      ( <img 
        className={`obstacle obstacle-pos-${position}`}
        key={i}
        src="http://clipart-library.com/image_gallery/n756983.gif" 
        alt="obstacle" />))
    }
    this.setState({obstacles: obstacles, obstaclePositions: obstaclePositions})
  }

  setCollitionCourse() {
    return this.state.obstaclePositions.length 
      ? parseInt(this.state.obstaclePositions
        .sort(() => .5 - Math.random())
        .pop()
        .toString()
        .charAt(0))
    : 1;
  }

  render() {
    return (
      <section className="game-window">
        {this.state.obstacles}
        <img 
          className={`octo-ship ship-position-${this.setCollitionCourse()}` }
          src={ require("../images/jetpacktocat.png") }
          alt="obstacle" />
        < ProgressIndicator 
          currRound={ this.props.currRound } />
      </section>
    )
  }
}

export default GameWindow
