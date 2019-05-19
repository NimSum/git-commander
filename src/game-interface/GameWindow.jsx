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
      moveObstacle: false,
      octoExplode: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.collide === true) {
      this.collideWithObstacle();
    } else if (this.props.currRound + 1 === nextProps.currentRound) {
      this.moveOctocat();
    }
  }
  
  componentDidMount() {
    this.generateObstacles();
  }

  collideWithObstacle() {
    this.setState({ moveObstacle: true }, () => {
      setTimeout(() => {
        this.setState({octoExplode: true})
      }, 1800);
      setTimeout(() => {
        this.generateObstacles();
        this.setCollitionCourse();
        this.setState({ moveObstacle: false, octoExplode: false });
        this.props.activateCollition(false);
      }, 3000);
    })
  }

  moveOctocat() {
    this.setState({
      octoCatPosition: this.state.clearPath,
      moveObstacle: !this.state.moveObstacle
    }, () => setTimeout(()=> {
      let possiblePos = 
        [1, 2, 3, 4, 5].filter(num => num !== this.state.clearPath)
        .sort(() => .5 - Math.random());
      this.setState({
        clearPath: possiblePos.pop(),
        moveObstacle: !this.state.moveObstacle
      }, this.generateObstacles);
    }, 3000)) 
  } 

  generateObstacles = () => {
    const obstacles = [];
    const obstaclePositions = [];
    for (let i = 0; i <= this.props.currRound + 10; i++) {
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
    const changePos = !this.state.obstaclePositions.some(num => 
      (this.state.octoCatPosition + '1') === num 
      || (this.state.octoCatPosition + '0') === num)
    if(changePos) {
      this.setState({octoCatPosition: parseInt(this.state.obstaclePositions
          .sort(() => .5 - Math.random())
          .pop()
          .toString()
          .charAt(0))
      })
    }
  }

  render() {
    return (
      <section 
        className={`game-window 
          ${this.props.currRound === 6 && 'lighten-background'}`}>
        <div 
          className={`obstacle-container ${this.state.moveObstacle ? 'obstacles-move' : 'obstacles-show'}`}>
          {this.state.obstacles}
        </div>
        <img 
          className={`octo-ship ship-position-${this.state.octoCatPosition} ${this.state.octoExplode && 'explode'}` }
          src={ require(`../images/${this.state.octoExplode ? 'explode-logo.png' : 'jetpacktocat.png'}`) }
          alt="obstacle" />
        < ProgressIndicator 
          currRound={ this.props.currRound } />
      </section>
    )
  }
}

export default GameWindow
