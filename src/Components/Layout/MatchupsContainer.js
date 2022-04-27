import React from 'react'
import "../../CSS/Matchups.css"
import Matchups from '../Card/Matchups'


const MatchupsContainer = ({testData}) => {
  return (
    <div class="matchup-container">
      <Matchups testData={testData}></Matchups>
    </div>
  )
}

export default MatchupsContainer