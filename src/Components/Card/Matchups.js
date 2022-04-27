import React from 'react'
import MatchupCard from './MatchupCard'


const Matchups = ({testData}) => {
  return (
    <div>

      {testData.map((data, index) =>
        <MatchupCard 
          id={index}
          home_team={data.home_team}
          away_team={data.away_team}
          home_score = {data.scores[0].score}
          away_score = {data.scores[1].score}
        />
      )}

    </div>
  )
}

export default Matchups