import React from 'react';

export function ChallengeHistory(props) {
  const removeStoredChallenge = () => {

  }
  return (
    <section className="challenge-history">
      <h3>Challenge History:</h3>
      <button onClick={ props.clearHistory }>Clear History</button>
      {props.challenges.length 
        ? props.challenges.map(challenge => {
        return (
          <article key={challenge.id}>
            <p className="challenge">Challenge: <span>{challenge.detail}</span></p>
            <p className="command">Command: <span>{challenge.answer}</span></p>
            <p><a
              target="_blank"
              rel="noopener noreferrer" 
              href="https://gist.github.com/NimSum/f190231f92183f4851074ef2502537c6">
              Learn More</a>
            </p>
          </article>
        )})
      : <h4>None Yet</h4> }
    </section>)
}

export default ChallengeHistory;