import React from 'react';

export function ChallengeHistory(props) {
  return (
    <section className="challenge-history">
      {props.challenges.length 
        ? props.challenges.map(challenge => {
        return (
          <article>
            <p><span>Challenge: </span>{challenge.detail}</p>
            <p><span>Answer: </span>{challenge.answer}</p>
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