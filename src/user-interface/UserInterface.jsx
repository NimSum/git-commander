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
      challengeHistory: JSON.parse(localStorage.getItem('storedChallenges')) || [],
      showAnswer: false,
    }
  }

  filterByDiff = () => {
    const questionsByDiff = this.props.challenges
    .filter(challenge => challenge.difficulty === this.state.currDifficulty.toString())
    .sort(() => .5 - Math.random());
    this.setState({ questionsByDiff })
  }

  generateChallenge = () => {
    const questionsByDiff = [...this.state.questionsByDiff];
    const selectedQuestion = questionsByDiff.pop();
    console.log(selectedQuestion);
    this.setState({
      currQuestion: selectedQuestion, 
      questionsByDiff
    })
  }

  componentDidMount() {
    this.generateChallenge();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentRound === 7) {
      this.generateChallenge();
    } else if (nextProps.resetGame === 'reset') {
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
      this.setState( {showAnswer: 'correct', userAnswer: ''} )
      this.props.nextRound();
      setTimeout(() => {
        this.setState( {showAnswer: false } )
        this.saveSolvedChallenge();
        this.changeDifficulty();
      }, 3000);
    } else if (this.state.userAnswer.length > 3) {
      this.incorrectAnswer();
      this.setState( {showAnswer: 'incorrect'} )
    } else {
      this.setState( {userAnswer: ''} )
      return;
    }
  }

  saveSolvedChallenge() {
    this.setState({
      challengeHistory: [this.state.currentQuestion].concat(this.state.challengeHistory)
    }, () => {
      localStorage.setItem('storedChallenges', JSON.stringify(this.state.challengeHistory))
    })
  }

  incorrectAnswer() {
    this.props.activateCollition(true);
  }

  changeDifficulty() {
    let newDifficulty = this.state.currDifficulty + Math.round(Math.random() + .2);
    if (this.state.currDifficulty < 5) {
      this.setState({
        currDifficulty: newDifficulty
      }, () => {
        this.generateChallenge();
      })
    } 
  }

  handleChange = e => {
    this.setState({ userAnswer: e.target.value })
  }

  render() {
    return (
      <aside className="user-interface">
        <h2>Commander <span>{ this.props.playerName }</span></h2>
        <h3>Command Center:</h3>
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
            { this.state.showAnswer === 'incorrect' && 
              < FeedbackPrompt 
                correct={ 'incorrect' } 
                {...this.state } /> }
            { this.state.showAnswer === 'correct' && 
              < FeedbackPrompt 
                correct={ 'correct' } 
                {...this.state } /> }
          </form>  
        </div>
        < ChallengeHistory
          challenges={this.state.challengeHistory} />
      </aside>
    )
  }
}

export default UserInterface
