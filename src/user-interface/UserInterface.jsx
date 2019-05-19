import React, { Component } from 'react'
import { ChallengeCard } from './ChallengeCard';
import { ChallengeHistory } from './ChallengeHistory'
import { FeedbackPrompt } from '../prompts/FeedbackPrompt';

export class UserInterface extends Component {
  constructor() {
    super()
    this.state = {
      currQuestion: {},
      currDifficulty: 1,
      questionsByDiff: [],
      userAnswer: '',
      challengeHistory: JSON.parse(localStorage.getItem('storedChallenges')) || [],
      showAnswer: false,
    }
  }
  
  filterByDiff = () => {
    const filteredByDiff = this.props.challenges
    .filter(challenge => challenge.difficulty === this.state.currDifficulty.toString())
    .sort(() => .5 - Math.random());
    this.setState({ questionsByDiff: filteredByDiff })
  }

  generateChallenge = () => {
    const questionsByDiff = [...this.state.questionsByDiff];
    const selectedQuestion = questionsByDiff.pop();
    this.setState({
      currQuestion: selectedQuestion, 
      questionsByDiff
    })
  }

  componentDidMount() {
    this.filterByDiff();
    setTimeout(this.generateChallenge);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentRound === 7) {
      this.generateChallenge();
    } else if (nextProps.resetGame === 'reset') {
      this.setState({
        currDifficulty: 1,
        showAnswer: false
      }, () => {
        this.filterByDiff();
        setTimeout(this.generateChallenge);        
      });
    }
  }

  verifyAnswer = e => {
    e.preventDefault();
    e.target.reset();
    if (this.state.currQuestion.answer === this.state.userAnswer) {
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
      challengeHistory: [this.state.currQuestion].concat(this.state.challengeHistory)
    }, () => {
      localStorage.setItem('storedChallenges', JSON.stringify(this.state.challengeHistory))
    })
  }

  incorrectAnswer() {
    this.props.activateCollition(true);
  }

  changeDifficulty() {
    let prevDifficulty = this.state.currDifficulty;
    let newDifficulty = this.state.currDifficulty + Math.round(Math.random() + .2) ;
    if (this.state.currDifficulty < 5 && prevDifficulty !== newDifficulty) {
      this.setState({
        currDifficulty: newDifficulty
      }, () => {
        this.filterByDiff();
        this.props.currentRound !== 6 && setTimeout(this.generateChallenge);        
      })
    } else this.generateChallenge(); 
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
          challenge={ this.state.currQuestion }
          showAnswer={ this.state.showAnswer }/> 
        <div className="form-container">
          <form onSubmit={ this.verifyAnswer }>
            <label htmlFor="command-input"></label>
            <input 
              onChange={ this.handleChange } 
              id="command-input" 
              type="text" 
              placeholder="Enter Your Command"
              autoFocus
              disabled={ this.props.inputDisabled }/>
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
