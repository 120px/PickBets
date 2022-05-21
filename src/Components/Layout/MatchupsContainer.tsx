import React from 'react'
import "../../CSS/Matchups.css"
import Matchups from '../Card/Matchups'


const MatchupsContainer: React.FC = () => {
  return (
    <div className="matchup-container">
      <div className='matchup-bet-header-container'>
        <div className='bet-header-contents'>
          <div className='header-sports-title'>
            <h3>sport</h3>
          </div>

          <div className='header-bet-types'>
            <div className="bet-header-container">
              <div className="bet-header">money line</div>
            </div>
            <div className="bet-header-container">
              <div className="bet-header">money line</div>
            </div>
            <div className="bet-header-container">
              <div className="bet-header">money line</div>
            </div>


          </div>

        </div>
      </div>
      <Matchups ></Matchups>
    </div>
  )
}

export default MatchupsContainer