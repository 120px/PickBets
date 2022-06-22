import React from 'react'
import { Model_Bet } from '../../Models/Model_Bet'

interface Props {
    betting_for: string
    betting_against: string
    wager: number
    potential_payout: number
    bet_result: string
}

const BetHistoryItem = ({ betting_for, betting_against, wager, bet_result, potential_payout }: Props) => {
    return (
        <div className='bet_history__item_container'>

            <div className='bet_history__team_names'>
                <div className='bet_history__team_chosen'>
                    {betting_for}
                </div>

                <div className='bet_history__team_against'>
                    <div className='bet_history__team_against_inner'>
                        {betting_against}
                    </div>
                </div>
            </div>

            <div className='bet_history__wager'>
                Wager: ${wager}
            </div>

            <div className='bet_history__bet_result'>
                {bet_result === "WIN" ?
                    <div>
                        <span className='bet_result__win'>{bet_result}</span>
                        <span className=''> ${(wager + potential_payout).toFixed(2)}</span>

                    </div>

                    : <span className='bet_result__lose'>{bet_result}</span>}
            </div>
        </div>
    )
}

export default BetHistoryItem