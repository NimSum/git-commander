import React, { Component } from 'react'
import { ChallengeCard } from './ChallengeCard';
import { ChallengeHistory } from './ChallengeHistory'
import { ChargeBar } from './ChargeBar';

export class UserInterface extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentQuestion: null,
      currDifficulty: 1,
      questionsByDiff: [],
      userAnswer: '',
      challengeHistory: []
    }
  }

  generateChallenge = () => {
    const questionsByDiff = this.props.challenges
      .filter(challenge => challenge.difficulty === this.state.currDifficulty.toString())
      .sort(() => .5 - Math.random());
    this.setState({
      questionsByDiff: questionsByDiff, 
      currentQuestion: questionsByDiff.pop()
    })
  }

  componentDidMount() {
    this.generateChallenge();
  }

  verifyAnswer = e => {
    e.preventDefault();
    if (this.state.currentQuestion.answer === this.state.userAnswer) {
      e.target.reset();
      this.saveSolvedChallenge();
      this.changeDifficulty();
      this.props.nextRound();
    } else {
      this.incorrectAnswer();
    }
  }

  saveSolvedChallenge() {
    this.setState({
      challengeHistory: this.state.challengeHistory.concat(this.state.currentQuestion)
    })
  }

  incorrectAnswer() {
    this.props.activateCollition();
  }

  changeDifficulty() {
    if (this.state.currDifficulty < 5) {
      this.setState({
        currDifficulty: this.state.currDifficulty + Math.round(Math.random() + .1)
      }, () => this.generateChallenge())
    } else {
      this.generateChallenge();
    }
  }

  handleChange = e => {
    this.setState({ userAnswer: e.target.value })
  }

  render() {
    return (
      <aside className="user-interface">
        <h2>Commander { this.props.playerName }</h2>
        { this.state.currentQuestion && 
          < ChallengeCard challenge={ this.state.currentQuestion }/> }
        <form onSubmit={ this.verifyAnswer }>
          <label htmlFor="command-input">Command Center</label>
          <input 
            onChange={ this.handleChange } 
            id="command-input" 
            type="text" 
            autoFocus/>
        </form>
        < ChargeBar />
        < ChallengeHistory
          challenges={this.state.challengeHistory} />
      </aside>
    )
  }
}

export default UserInterface
