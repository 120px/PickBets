import React, { useEffect, useState } from 'react'
import "../../CSS/BetSideBar.css"
import Bet from "../SideBarBet/Bet"
import { useQuery } from '@apollo/client'
import { QUERY_GETUSERBETS } from '../../GraphQL/QUERY_GETUSERBETS'
import { Model_Bet } from '../../Models/Model_Bet'


interface Props {
  user_data: any
}

const BetSideBar: React.FC<Props> = ({ user_data }) => {

  const { loading, error, data } = useQuery(QUERY_GETUSERBETS)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {

  }, [refreshKey])

  const refreshBets = () => {
    setRefreshKey(refreshKey + 1); // Increment refreshKey to force re-render
  };

  const ShowDummyBets = () => {
    const user_data = undefined; // Assuming user_data is defined elsewhere if needed

    if (user_data === undefined) {
      let storedDummyBetsString = localStorage.getItem("DUMMY_BETS");

      if (storedDummyBetsString) {
        let dummyBets = JSON.parse(storedDummyBetsString);
        console.log(dummyBets)

        if (dummyBets !== undefined && dummyBets.length > 0) {
          return (
            <>
              {dummyBets.map((item: any, index: number) => (
                <Bet
                  key={index}
                  data={item.data}
                  betting_for={item.bettingFor}
                  betting_against={item.bettingAgainst}
                  wager={item.wager}
                  potential_payout={item.potentialPayout}
                  bet_result={item.betResult}
                />
              ))}
            </>
          );
        }
      }
    }
    else {
      if (data !== undefined) {
        return (
          data.findUserBets.map((item: Model_Bet, index: React.Key | null | undefined) =>

            <Bet
              key={index}
              data={data}
              betting_for={item.betting_for}
              betting_against={item.betting_against}
              wager={item.wager}
              potential_payout={item.potential_payout}
              bet_result={item.bet_result}

            />
          )
        )
      }
    }
  }

  return (
    <div className="betsidebar-container">
      <div className='betsidebar_heading'>
        <h4 className='betsidebar_title'>
          Recent Bets
        </h4>
        <button onClick={() => refreshBets()}>Refresh</button>

      </div>

      {ShowDummyBets()}

    </div>
  )
}

export default BetSideBar