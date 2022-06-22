import React from 'react'
import BetHistoryItem from './BetHistoryItem'
import "../../CSS/BetHistory.css"
import { Model_Bet } from '../../Models/Model_Bet'
import { useQuery } from '@apollo/client'
import { QUERY_GETALLUSERBETS } from '../../GraphQL/QUERY_GETALLUSERBETS'
import { MODES } from '../../Models/Modes'

interface Props {
    changeMode: (mode: string) => void
}

const BetHistory = ({changeMode} : Props) => {

    const { loading, error, data } = useQuery(QUERY_GETALLUSERBETS)

    return (
        <div className='bet_history_container'>

            <div className='bet_history__title'>
                <h5 onClick={() => changeMode(MODES.NORMAL)}>Return to home</h5>
            </div>
            
            {data !== undefined ? data.findAllUserBets.map((item: Model_Bet) =>

                <BetHistoryItem
                    betting_for={item.betting_for}
                    betting_against={item.betting_against}
                    wager={item.wager}
                    potential_payout={item.potential_payout}
                    bet_result={item.bet_result}                  

                />

            ) : null
            }


        </div>
    )
}

export default BetHistory