import React, { Component } from 'react'

export class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: ''
    }
  }

  handleChange = e => {
    this.setState({userName: e.target.value});
  }

  startGame = e => {
    e.preventDefault();
    this.props.startGame(this.state.userName);
  }

  render() {
    return (
      <section className="splash-page">
        <h2>GIT COMMANDER</h2>
        <form onSubmit={ this.startGame }>
          <div className="form-item-container">
            <label htmlFor="userName">Your Commander Name:</label>
            <input id="userName" type="text" onChange={this.handleChange} />
            <input className="start-game-btn" type="button" onClick={ this.startGame } value="Let's git started!"/>
          </div>
        </form>
        <img className="octocat-ship" src={require("../images/code-octocat.png")} alt="octocat"/>
      </section>
    )
  }
}

export default Splash
