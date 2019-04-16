import React from 'react';

export function FeedbackPrompt (props) {
  let elContainer;

  switch(true) {
    case props.reset:
      elContainer = 
        (<article className="user-prompt">
          <h3>Incorrect!</h3>
          <p>Would you like to try again ?</p>
          <button 
            onClick={ props.resetGame } 
            type="button">
            PPPPPRACTICE
          </button>
        </article>)
    break;
    case props.winner:
      elContainer = 
        (<article className="user-prompt">
          <h3>You have reached Remote Repo!</h3>
          <p>You can keep going by pressing button below </p>
          <button 
            onClick={ props.nextRound } 
            type="button">
            git Good
          </button>
        </article>)
    break;
    case props.correct:
    elContainer = 
      (<div className="solution-box">
        <h4>Incorrect!</h4>
        <p>The correct command was:</p>
        <p>{ props.currentQuestion.answer }</p>
      </div>)
    break;
    default: 
    elContainer = (<div>HI</div>)
  }

  return elContainer;
}

export default FeedbackPrompt;
