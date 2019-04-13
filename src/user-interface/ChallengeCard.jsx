import React from 'react';

export function ChallengeCard (props) {
  return (
    <article className="challenge-card">
      <div>
        <p>{props.challenge.statement}</p>
      </div>
      <div>
        <p>{props.challenge.detail}</p>
      </div>
    </article>
  )
}