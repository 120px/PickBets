import React from 'react'
import "../../CSS/BetSideBar.css"
import Bet from "../SideBarBet/Bet"
import Button from "react-bootstrap/Button"

const BetSideBar = () => {
  return (
    <div className="betsidebar-container">
      <Bet></Bet>
      <Bet></Bet>

      <Button>Confirm Bet</Button>
    </div>
  )
}

export default BetSideBar