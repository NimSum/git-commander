import React from 'react';

export function ChargeBar (props) {
  return (
    <section className="charge-bar-container">
      <h3>Teleportation Charge:</h3>
      <div>
        <span className="charge-bar"></span>
        <span className="charge-bar"></span>
        <span className="charge-bar"></span>
      </div>
    </section>
    )
}

export default ChargeBar;