import React, { useEffect } from 'react'
import "../../CSS/Bet.css"
import WagerAndWinning from './WagerAndWinning'

interface Props {
    data: any
    betting_for: string
    betting_against: string
    wager: number
    potential_payout: number
    bet_result: string
}

const Bet = ({ data, betting_for, betting_against, potential_payout, wager, bet_result }: Props) => {

    return (
        <div className='bet-container'>

            <div className='bet-matchup-title'>
                <div className='betting_for_team'>
                    {betting_for}
                </div>
                Vs
                <div>
                    {betting_against}
                </div>
            </div>

            <div className='bet-type'>

            </div>

            <WagerAndWinning potential_payout={potential_payout} wager={wager}></WagerAndWinning>

            <div>
                {bet_result === "WIN" ?
                    <div className='display_bet_result' style={{ backgroundColor: "green" }}>
                        <span>{bet_result}</span>
                    </div> :

                    <div className='display_bet_result' >
                        <span>{bet_result}</span>
                    </div>}

            </div>

        </div>
    )
}

export default Bet