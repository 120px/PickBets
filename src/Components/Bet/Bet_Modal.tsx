import React, { useRef, useState } from 'react'
import "../../CSS/Bet_Modal.css"
import { Button } from 'react-bootstrap'
import { Chosen_Bet } from '../../Models/Chosen_Bet'
import { useMutation } from '@apollo/client'
import { CREATE_BET } from '../../GraphQL/CREATE_BET'
import { AiOutlineCloseCircle } from "react-icons/ai";
import { stringify } from 'querystring'

interface Props {
    bet: Chosen_Bet
    user_data: any
    setShowBetModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Bet_Modal = ({ bet, user_data, setShowBetModal }: Props) => {

    const [wager, setWager] = useState(0)
    const [createBet,] = useMutation(CREATE_BET)
    const errorWager = React.useRef() as React.MutableRefObject<HTMLInputElement>;

    const generateResult = () => {
        let result = Math.floor(Math.random() * 2)

        if (result === 0) return "WIN"
        else return "LOSE"
    }

    const createBetForUser = async () => {

        if (wager < 2){
            errorWager.current.innerText = "Wager must be more than $2"
            return
        }

        const result = generateResult()

        const created_bet = await createBet({
            variables: {
                betResult: result,
                inProgress: false,
                wager: wager,
                potentialPayout: parseFloat((wager * bet.odds!).toFixed(2)),
                odds: bet.odds,
                bettingAgainst: bet.against_team,
                bettingFor: bet.chosen_team,
                userId: user_data.whoAmI.id
            },
            
        })
        setShowBetModal(false)
        errorWager.current.innerText = ""
    }

    const handleCloseModal = () =>{
        setShowBetModal(false)
        errorWager.current.innerText = ""
    }

    const handleWagerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        const pattern = /^\d+$/
        if (pattern.test(e.currentTarget.value) === true){
            setWager(parseFloat(e.currentTarget.value))
        }else{
            e.currentTarget.value = ""
        }
            
    }

    const confirmBet = () => {
        createBetForUser()
    }

    return (
        <div className='modal_bet_container'>

            <div className='modal_bet_contents'>

                <div className='btn-exit-modal'>
                    <AiOutlineCloseCircle onClick={handleCloseModal} size={"30"}></AiOutlineCloseCircle>
                </div>

                <div>
                    <h3>Adjust your bet</h3>
                </div>

                <div className='bet_details'>
                    <div className='chosen_team_name'>
                        <p id="chosen_team_title"> {bet.chosen_team} to win the match </p>
                        <span id="odds">{bet.odds}</span>
                    </div>

                    <div className='home_vs_away_info'>
                        <p>{bet.home_team} @ {bet.away_team}</p>
                    </div>
                </div>

                <div className='bet_input_container'>

                    <div className='bet_input_contents'>

                        <div className='bet_wager_container'>
                            $<input pattern="[0-9]*" className='bet_wager__input' onChange={handleWagerChange} name='wager' type="text" placeholder='Enter Wager'></input>
                        </div>
                        <span> x {bet.odds} = </span>
                        <div className='bet_potentialPayout'>
                            <p><span id="bet_payoutMoney">$</span>{Math.round((wager * bet.odds!) * 100) / 100}</p>
                        </div>
                    </div>
                </div>

                <div>
                    <p ref={errorWager}></p>
                </div>

                <div >
                    <Button onClick={confirmBet}>Place bet</Button>
                </div>

            </div>
        </div>
    )
}

export default Bet_Modal