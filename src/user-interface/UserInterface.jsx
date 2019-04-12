import React, { Component } from 'react'
import { ChallengeCard } from './ChallengeCard';
import { ChargeBar } from './ChargeBar';

export class UserInterface extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  
  render() {
    return (
      <aside className="user-interface">
        <h2>Commander: Nimsum</h2>
        < ChallengeCard />
        < ChargeBar />
        <form>
          <label for="command-input">Command Center</label>
          <input id="command-input" type="text"></input>
        </form>
      </aside>
    )
  }
}

export default UserInterface
