import React from 'react'
import "../../CSS/Bet.css"
import WagerAndWinning from './WagerAndWinning'

const Bet = () => {
    return (
        <div className='bet-container'>

            <div className='bet-matchup-title'>
                <div>
                    Houstan Texas
                </div>
                Vs
                <div>
                    Kansas City Chiefs
                </div>
            </div>

            <div className='bet-type'>

            </div>

            <div className='bet-odds-container'>
                <div className='bet-odds-matchup-container'>
                    <div className='bet-odds-team'>
                        <div className='bet-odds-team-name'>Houstan Texas</div>
                        <div className='bet-odds'><span>-185</span></div>
                    </div>
                    <div className='bet-odds-team'>
                        <div className='bet-odds-team-name'>Kansas City Chiefs</div>
                        <div className='bet-odds'>
                            <span>-185</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='wager-payout-title text-center'>
                Wager & Payout
            </div>

            <WagerAndWinning></WagerAndWinning>

        </div>
    )
}

export default Bet