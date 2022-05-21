import React from 'react'
import "../../CSS/WagerAndWinning.css"

const WagerAndWinning = () => {
    return (
        <div className='wager-towin-container'>
            <div className='wager-towin-contents'>
                <div className='wager-input-container'>
                    <div className='wager-title text-center'>Wager</div>
                    <input className='wager-input'></input>
                </div>
                <div className='wager-payout-container'>
                    <div className='payout-title text-center'>Payout</div>
                    <div className='wager-payout text-center'>
                        <span>$100</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WagerAndWinning