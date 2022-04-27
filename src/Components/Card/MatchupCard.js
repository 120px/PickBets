import React from 'react'
import "../../CSS/MatchupCard.css"
import Button from "react-bootstrap/Button"

const MatchupCard = ({ home_team, away_team, home_score, away_score }) => {
  return (
    <div className="matchup-card-container">
      <div className="matchup-card-inner-container">

        <div className='matchup-card-team-names-container'>
          <div>
            <div> <span className='card-team-currentScore'>{home_score}</span> {home_team} </div>
          </div>

          <div>
            <div><span className='card-team-currentScore'>{away_score} </span>{away_team}</div>
          </div>
        </div>

        <div className='matchup-card-bets-container'>

          <div className='card-moneyLine-bet-container'>
            <div className='card-moneyLine-bet'>
              <button class="moneyLine-bet-btn">-175</button>
              <button class="moneyLine-bet-btn">-175</button>
            </div>
          </div>

          <div className='card-runLine-bet'>
            <button class="moneyLine-bet-btn">-175</button>
            <button class="moneyLine-bet-btn">-175</button>
          </div>
          <div className='card-overUnder-bet'>
            <button class="moneyLine-bet-btn">-175</button>
            <button class="moneyLine-bet-btn">-175</button>
          </div>
        </div>

        {/* <div>
          <p>{away_team}</p>
          <span>{away_score}</span>
        </div> */}


      </div>


    </div>
  )
}

export default MatchupCard