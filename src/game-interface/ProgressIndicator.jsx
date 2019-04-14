import React from 'react'

export function ProgressIndicator(props) {
  return (
    <div className="progress-indicator">
      <span
      className={props.currRound >= 6 ? "current-round" : undefined}>Remote</span>
      <span
      className={props.currRound >= 5 ? "current-round" : undefined}></span>
      <span
      className={props.currRound >= 4 ? "current-round" : undefined}></span>
      <div className="vertical-line"></div>
      <span
      className={props.currRound >= 3 ? "current-round" : undefined}></span>
      <span
      className={props.currRound >= 2 ? "current-round" : undefined}></span>
      <span 
      className={props.currRound >= 1 ? "current-round" : undefined}>Local</span>
    </div>
  )
}