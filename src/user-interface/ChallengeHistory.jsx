import React from 'react';

export function ChallengeHistory(props) {
  return (
    <section className="challenge-history">
      <h3>Challenge History</h3>
      {props.challenges.map(challenge => {
        return (
          <article>
            <p><span>Challenge: </span>{challenge.detail}</p>
            <p><span>Answer: </span>{challenge.answer}</p>
            <p><span>Learn More: </span>{challenge.moreInfo}</p>
          </article>
        )})}
    </section>)
}

export default ChallengeHistory;