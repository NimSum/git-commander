import React, { Component } from 'react'
import { ChallengeCard } from './ChallengeCard';
import { ChargeBar } from './ChargeBar';

export class UserInterface extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentQuestion: null,
      currDifficulty: 1
    }
  }

  componentDidMount() {
    this.setState({currentQuestion: this.props.challenges})
  }

  render() {

    return (
      <aside className="user-interface">
        <h2>Commander { this.props.playerName }</h2>
        < ChallengeCard />
        < ChargeBar />
        <form>
          <label htmlFor="command-input">Command Center</label>
          <input id="command-input" type="text"></input>
        </form>
      </aside>
    )
  }
}

export default UserInterface
