import React, { Component } from 'react'
import { ProgressIndicator } from './ProgressIndicator';

export class GameWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clearPath: Math.round(Math.random() * (5 - 1) + 1),
      obstacles: [],
      obstaclePositions: [],
      octoCatPosition: 1,
      moveObstacle: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.currRound !== nextProps) {
      this.moveOctocat();
    }
  }
  
  componentDidMount() {
    this.generateObstacles();
  }

  moveOctocat() {
    this.setState({
      octoCatPosition: this.state.clearPath,
      moveObstacle: !this.state.moveObstacle
    }, () => setTimeout(()=> {
        this.setState({
          clearPath: Math.round(Math.random() * (5 - 1) + 1),
          moveObstacle: !this.state.moveObstacle
        }, this.generateObstacles);
      }, 3000)) 
  } 

  generateObstacles = () => {
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
    this.setState({
      obstacles: obstacles, 
      obstaclePositions: obstaclePositions
    }, this.setCollitionCourse)
  }

  setCollitionCourse() {
    const changePos = !this.state.obstaclePositions.some(num => (this.state.octoCatPosition + '1') === num)
    if(changePos) {
      this.setState({octoCatPosition: this.state.obstaclePositions.length 
        ? parseInt(this.state.obstaclePositions
          .sort(() => .5 - Math.random())
          .pop()
          .toString()
          .charAt(0))
        : 1
      })
    }
  }

  render() {
    return (
      <section className="game-window">
        <div 
          className={`obstacle-container ${this.state.moveObstacle ? 'obstacles-move' : undefined}`}>
          {this.state.obstacles}
        </div>
        <img 
          className={`octo-ship ship-position-${this.state.octoCatPosition}` }
          src={ require("../images/jetpacktocat.png") }
          alt="obstacle" />
        < ProgressIndicator 
          currRound={ this.props.currRound } />
      </section>
    )
  }
}

export default GameWindow
