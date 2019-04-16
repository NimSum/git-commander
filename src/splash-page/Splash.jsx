import React, { Component } from 'react'

export class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      octoForward: false
    }
  }

  handleChange = e => {
    this.setState({userName: e.target.value});
  }

  startGame = e => {
    e.preventDefault();
    this.setState( {octoForward: true} )
    setTimeout(
      ()=> this.props.startGame(this.state.userName)
    , 100
    )
  }

  render() {
    return (
      <section className="splash-page">
        <h2>GIT COMMANDER</h2>
        <form onSubmit={ this.startGame }>
          <div className="form-item-container">
            <label htmlFor="userName">Your Commander Name:</label>
            <input 
              id="userName" 
              type="text" 
              onChange={ this.handleChange } 
              autoFocus />
            <input 
              className="start-game-btn" 
              type="button" 
              onClick={ this.startGame } 
              value={this.state.octoForward ? "Let's git Started!" : 'Start Game'}/>
          </div>
        </form>
        <img 
          className={`octocat-ship ${this.state.octoForward ? 'octo-forward' : '' }`}
          src={ require("../images/jetpacktocat.png") } 
          alt="octocat"/>
        <div className="instructions-cont">
          <h3>Instructions:</h3>
          <h4>Help octocat make it to remote repo!</h4>
          <ol>
            <li>Read the prompts for Instructions</li>
            <li>Type in your command and press enter when ready!
              <p><b>Be Careful! You only have one chance per challenge!</b></p>
            </li>
            <li>Once you reach the 'Remote' Repo, you win! You also have the option to keep going solve harder commands!</li>
          </ol>
        </div>
      </section>
    )
  }
}

export default Splash;
