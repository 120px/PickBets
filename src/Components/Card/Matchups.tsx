import React from 'react'
import MatchupCard from './MatchupCard'
import testData from "../../dataOdds.json"
import { API_Data } from '../../Models/API_Data'

interface Props{
  user_data: any
  apiData: API_Data[] | undefined
}

const Matchups = ({user_data, apiData} : Props) => {
  //if empty, don't return a matchup card
  return (
    <div className="m-auto">

      {apiData !== undefined ? apiData!.map((data, index) =>

        <MatchupCard
        user_data={user_data} 
        key={index}
        home_team = {data.home_team}
        away_team = {data.away_team}
        h2h_home = {data.bookmakers[0].markets.find(h2h => h2h.key === "h2h")?.outcomes[0].price}
        h2h_away = {data.bookmakers[0].markets.find(h2h => h2h.key === "h2h")?.outcomes[1].price}
        spread_home = {data.bookmakers[0].markets.find(spreads => spreads.key ==="spreads")?.outcomes[0].price}
        spread_away = {data.bookmakers[0].markets.find(spreads => spreads.key ==="spreads")?.outcomes[1].price}
        commence_time = {data.commence_time}

        />
      ) : null}

    </div>
  )
}

export default Matchups