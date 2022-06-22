import React from 'react'
import "../../CSS/BetSideBar.css"
import Bet from "../SideBarBet/Bet"
import Button from "react-bootstrap/Button"
import testData from "../../dataOdds.json"
import { useQuery } from '@apollo/client'
import { QUERY_GETUSERBETS } from '../../GraphQL/QUERY_GETUSERBETS'
import { Model_Bet } from '../../Models/Model_Bet'
import { BsFillArrowLeftSquareFill } from "react-icons/bs";

const BetSideBar = () => {

  const { loading, error, data } = useQuery(QUERY_GETUSERBETS)

  return (
    <div className="betsidebar-container">
      <div className='betsidebar_heading'>
        <h4 className='betsidebar_title'>
          Recent Bets
        </h4>

        <div></div>

        
      </div>
      
      {data !== undefined ? data.findUserBets.map((item: Model_Bet, index: React.Key | null | undefined) =>

        <Bet
          key = {index}
          data={data}
          betting_for={item.betting_for}
          betting_against={item.betting_against}
          wager={item.wager}
          potential_payout={item.potential_payout}
          bet_result={item.bet_result}

        />

      ) : null}

      
    </div>
  )
}

export default BetSideBar