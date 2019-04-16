import React, { Component } from 'react'
import { ChallengeCard } from './ChallengeCard';
import { ChallengeHistory } from './ChallengeHistory'
import { FeedbackPrompt } from '../prompts/FeedbackPrompt';

export class UserInterface extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentQuestion: {},
      currDifficulty: 1,
      questionsByDiff: [],
      userAnswer: '',
      challengeHistory: [],
      showAnswer: false,
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentRound === 7) {
      this.generateChallenge();
    }else if (this.props.resetGame === 'reset') {
      this.setState({
        currDifficulty: 1,
        showAnswer: false
      }, () => this.generateChallenge());
    }
  }

  verifyAnswer = e => {
    e.preventDefault();
    e.target.reset();
    if (this.state.currentQuestion.answer === this.state.userAnswer) {
      this.saveSolvedChallenge();
      this.changeDifficulty();
      this.props.nextRound();
    } else {
      this.incorrectAnswer();
      this.setState( {showAnswer: true} )
    }
  }

  saveSolvedChallenge() {
    this.setState({
      challengeHistory: this.state.challengeHistory.concat(this.state.currentQuestion)
    })
  }

  incorrectAnswer() {
    this.props.activateCollition(true);
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
        <h2>Commander <span>{ this.props.playerName }</span></h2>
        < ChallengeCard 
          challenge={ this.state.currentQuestion }
          showAnswer={ this.state.showAnswer }/> 
        <div className="form-container">
          <form onSubmit={ this.verifyAnswer }>
            <label htmlFor="command-input"></label>
            <input 
              onChange={ this.handleChange } 
              id="command-input" 
              type="text" 
              placeholder="Enter Your Command"
              autoFocus/>
            {this.state.showAnswer && 
              < FeedbackPrompt 
                correct={ true } 
                {...this.state } />}
          </form>  
        </div>
        {/* < ChargeBar /> */}
        <h3>Challenge History:</h3>
        < ChallengeHistory
          challenges={this.state.challengeHistory} />
      </aside>
    )
  }
}

export default UserInterface
