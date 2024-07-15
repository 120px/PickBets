import MatchupCard from './MatchupCard'
import { API_Data } from '../../Models/API_Data'

interface Props {
  user_data: any
  apiData: API_Data[] | undefined
}

const Matchups = ({ user_data, apiData }: Props) => {
  //if empty, don't return a matchup card

  if (apiData?.length === 0)
    console.log("no data to show")

  return (
    <div className="m-auto">
      {apiData?.length !== 0 && apiData !== undefined ? apiData!.map((data, index) =>

        <MatchupCard
          user_data={user_data}
          key={index}
          home_team={data.home_team}
          away_team={data.away_team}
          h2h_home={data.bookmakers[0].markets.find(h2h => h2h.key === "h2h")?.outcomes[0].price}
          h2h_away={data.bookmakers[0].markets.find(h2h => h2h.key === "h2h")?.outcomes[1].price}
          spread_home={data.bookmakers[0].markets.find(spreads => spreads.key === "spreads")?.outcomes[0].price}
          spread_away={data.bookmakers[0].markets.find(spreads => spreads.key === "spreads")?.outcomes[1].price}
          point_home={data.bookmakers[0].markets.find(spreads => spreads.key === "spreads")?.outcomes[0].point}
          point_away={data.bookmakers[0].markets.find(spreads => spreads.key === "spreads")?.outcomes[1].point}
          commence_time={data.commence_time}

        />
      ) :
        <div>
          <h3>Currently no games to show</h3>
        </div>
      }

    </div>
  )
}

export default Matchups