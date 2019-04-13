import React, { Component } from 'react'
import { ChallengeCard } from './ChallengeCard';
import { ChargeBar } from './ChargeBar';

export class UserInterface extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentQuestion: {},
      currDifficulty: 1,
      userAnswer: ''
    }
  }

  generateChallenge() {
    const randomQuestion = this.props.challenges
    .filter(challenge => challenge.difficulty === this.state.currDifficulty.toString())
    .pop();
    this.setState( {currentQuestion: randomQuestion} )
  }

  componentDidMount() {
    this.generateChallenge()
  }

  verifyAnswer = e => {
    e.preventDefault();
    if (this.state.currentQuestion.answer === this.state.userAnswer) {
      e.target.reset();
      this.changeDifficulty();
      this.props.nextRound();
      this.generateChallenge();
    }
  }

  changeDifficulty() {
    if (this.state.currDifficulty < 5) {
      this.setState({
        currDifficulty: this.state.currDifficulty + Math.round(Math.random() + .05)
      })
    }
  }

  handleChange = e => {
    this.setState({ userAnswer: e.target.value })
  }

  render() {
    return (
      <aside className="user-interface">
        <h2>Commander { this.props.playerName }</h2>
        < ChallengeCard challenge={this.state.currentQuestion}/>
        < ChargeBar />
        <form onSubmit={ this.verifyAnswer }>
          <label htmlFor="command-input">Command Center</label>
          <input onChange={ this.handleChange } id="command-input" type="text"/>
        </form>
      </aside>
    )
  }
}

export default UserInterface
