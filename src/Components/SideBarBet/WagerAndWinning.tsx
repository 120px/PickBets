import React from 'react'
import "../../CSS/WagerAndWinning.css"

interface Props{
    potential_payout: number
    wager: number
}

const WagerAndWinning = ({potential_payout, wager} : Props) => {
    return (
        <div className='wager-towin-container'>
            <div className='wager-towin-contents'>
                <div className='wager-input-container'>
                    <div className='wager-title text-center'>Wagered: ${wager.toFixed(2)}</div>
                </div>
                <div className='wager-payout-container'>
                    <div className='payout-title text-center'>Potential Payout: ${potential_payout.toFixed(2)}</div>
                </div>
            </div>
        </div>
    )
}

export default WagerAndWinning