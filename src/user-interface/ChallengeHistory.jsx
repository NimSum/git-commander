import React from 'react';

export function ChallengeHistory(props) {
  return (
    <section className="challenge-history">
      <h3>Challenge History:</h3>
      {props.challenges.length 
        ? props.challenges.map((challenge, i) => {
        return (
          <article key={i}>
            <p class="challenge">Challenge: <span>{challenge.detail}</span></p>
            <p class="command">Command: <span>{challenge.answer}</span></p>
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