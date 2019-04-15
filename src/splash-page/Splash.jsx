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
      </section>
    )
  }
}

export default Splash;
