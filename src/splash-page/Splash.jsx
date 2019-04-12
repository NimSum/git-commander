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
        <form onSubmit={ this.startGame }>
          <div className="form-item-container">
          <label htmlFor="userName">Your Commander Name:</label>
          <input id="userName" type="text" onChange={this.handleChange}/>
          <input type="button" onClick={ this.startGame } value="Let's git started!"/>
          </div>
        </form>
      </section>
    )
  }
}

export default Splash
