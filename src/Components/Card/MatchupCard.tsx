import React, { useState } from 'react'
import "../../CSS/MatchupCard.css"
import Button from "react-bootstrap/Button"
import { useMutation } from '@apollo/client'
import { CREATE_BET } from '../../GraphQL/CREATE_BET'
import { Chosen_Bet, Bet_Type } from '../../Models/Chosen_Bet'
import Bet_Modal from '../Bet/Bet_Modal'
import { Alert } from 'react-bootstrap'

interface Props {
  home_team: string
  away_team: string
  h2h_home: number | undefined
  h2h_away: number | undefined
  spread_home: number | undefined
  spread_away: number | undefined
  point_home: number | undefined
  point_away: number | undefined
  commence_time: Date | string
}
interface Props {
  user_data: any
}

const MatchupCard = ({ home_team, away_team, h2h_home, h2h_away, user_data, spread_home, spread_away, point_home, point_away, commence_time }: Props) => {

  const [showBetModal, setShowBetModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)

  const [bet, setBet] = useState<Chosen_Bet>({
    away_team: "",
    home_team: "",
    chosen_team: "",
    against_team: "",
    odds: 1,
    type: ""
  })

  const handleOnClick_h2hHome = async () => {

    await setBet({
      away_team: away_team,
      home_team: home_team,
      chosen_team: home_team,
      odds: h2h_home,
      against_team: away_team,
      type: Bet_Type.h2h
    })

    setShowBetModal(!showBetModal)
  }

  const handleOnClick_h2hAway = async () => {

    await setBet({
      away_team: away_team,
      home_team: home_team,
      chosen_team: away_team,
      odds: h2h_away,
      against_team: home_team,
      type: Bet_Type.h2h
    })

    setShowBetModal(!showBetModal)
  }

  const handleOnClick_spreadHome = async () => {

    await setBet({
      away_team: away_team,
      home_team: home_team,
      chosen_team: home_team,
      odds: spread_home,
      against_team: away_team,
      point_spread: point_home,
      type: Bet_Type.spread

    })

    setShowBetModal(!showBetModal)
  }

  const handleOnClick_spreadAway = async () => {

    await setBet({
      away_team: away_team,
      home_team: home_team,
      chosen_team: away_team,
      odds: spread_away,
      against_team: home_team,
      point_spread: point_away,
      type: Bet_Type.spread
    })

    setShowBetModal(!showBetModal)
  }

  return (
    <div>
      {showBetModal === true ? <Bet_Modal setShowBetModal={setShowBetModal} user_data={user_data} bet={bet}></Bet_Modal> : null}

      <div className="matchup-card-container">
        <div className="matchup-card-inner-container">
          <div className='matchup-card-team-names-container'>
            <div>
              {point_home !== undefined ? <div className='card-team-currentScore'> {home_team + " | "}<span id="spread_estimation">{point_home}</span></div>
                : <div className='card-team-currentScore'> {home_team}</div>}

            </div>

            <div>
              {point_away !== undefined ? <div className='card-team-currentScore'>{away_team + " | "} <span id="spread_estimation">{point_away}</span></div> :
                <div className='card-team-currentScore'>{away_team} </div>}

            </div>

            {/* <p>{commence_time.toString()}</p> */}
          </div>

          <div className='matchup-card-bets-container'>

            <div className='card-moneyLine-bet-container'>
              <div className='card-moneyLine-bet'>
                {h2h_home !== undefined ? <button onClick={handleOnClick_h2hHome} className="moneyLine-bet-btn">{h2h_home}</button>
                  : <button className="moneyLine-bet-btn" disabled={true}>N/A</button>}

                {h2h_away !== undefined ? <button onClick={handleOnClick_h2hAway} className="moneyLine-bet-btn">{h2h_away}</button> :
                  <button className="moneyLine-bet-btn" disabled={true}>N/A</button>}

              </div>
            </div>

            <div className='card-runLine-bet'>
              {spread_home !== undefined ? <> <button onClick={handleOnClick_spreadHome} className="moneyLine-bet-btn">{spread_home}</button>  </> :
                <button className="moneyLine-bet-btn" disabled={true}>N/A</button>}

              {spread_away !== undefined ? <> <button onClick={handleOnClick_spreadAway} className="moneyLine-bet-btn">{spread_away}</button>  </> :
                <button className="moneyLine-bet-btn" disabled={true}>N/A</button>}

            </div>
            {/* <div className='card-overUnder-bet'>
              <button className="moneyLine-bet-btn">-175</button>
              <button className="moneyLine-bet-btn">-175</button>
            </div> */}
          </div>

        </div>

      </div>
    </div>
  )
}

export default MatchupCard