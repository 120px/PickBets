import React, { createContext, useContext, useEffect, useReducer, useRef, useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import "../../CSS/HeaderNavBar.css"
import { useMutation, useQuery } from '@apollo/client'
import { LOGOUT_USER } from '../../GraphQL/LOGOUT_USER'
import { QUERY_WHOAMI } from '../../GraphQL/QUERY_WHOAMI'
import { MODES } from '../../Models/Modes'
import User from './User'
import { BsPersonCircle } from "react-icons/bs";
import { UserLoginContext } from '../Context/UserLoginContext'
import { GiHamburgerMenu } from "react-icons/gi";
import CategorySports from '../CategorySidebar/CategorySports'

interface Props {
    handleModalChange: () => void
    changeMode: (mode: string) => void
    setSelectedSport: React.Dispatch<React.SetStateAction<string>>

}

const HeaderNavbar = ({ handleModalChange, changeMode, setSelectedSport }: Props) => {

    const [userLogOut,] = useMutation(LOGOUT_USER)
    const mobileMenuRef = useRef<any>()

    const handleChangeSport = (event: React.MouseEvent<HTMLElement>) => {
        setSelectedSport(event.currentTarget.id.toString())
    }

    const openMobileMenu = () => {

        if (mobileMenuRef.current!.style.display === "none") {
            mobileMenuRef.current!.style.display = "block"
            mobileMenuRef.current!.className = "testing"

        } else {
            mobileMenuRef.current!.style.display = "none"
        }

    }

    useEffect(() => {

    }, [])

    let authSection = null

    const { loading, error, data } = useQuery(QUERY_WHOAMI)
    //not logged in
    if (loading) {
    }
    else if (data) {
        authSection = (
            <>
                <Button onClick={handleModalChange}>Log in / Sign up</Button>
            </>
        )

    } else {
        authSection = (
            <>
                <div className='header_user_section'>
                    <div className='header_user_nameAndBalance'>
                        <BsPersonCircle size={25}></BsPersonCircle>
                        {data !== undefined ? <div>
                            <span>{data.whoAmI.username}</span>
                            <span>${(data.whoAmI.account_balance.toFixed(2))}</span>
                        </div>
                            : null}
                    </div>
                    <Button id="primary__link" onClick={() => { doUserLogout() }}>Logout</Button>

                </div>
            </>
        )
    }

    const doUserLogout = () => {
        userLogOut()
        window.location.reload()
    }

    return (
        <div className='header-container'>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Nav onClick={openMobileMenu} id="mobile__menu" className="me-auto">
                        <GiHamburgerMenu size={"30"}></GiHamburgerMenu>
                    </Nav>

                    <Navbar.Brand href="#home" onClick={() => changeMode(MODES.NORMAL)}>PickBets</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link id="primary__link" onClick={() => changeMode(MODES.BET_HISTORY)}>Bet History</Nav.Link>
                        <Nav.Link id="primary__link" onClick={() => changeMode(MODES.PROFILE)}>Profile</Nav.Link>
                    </Nav>
                    <Form className="d-flex">

                        {authSection}

                    </Form>
                </Container>
            </Navbar>

            <div ref={mobileMenuRef} style={{ display: "none" }}>
                <a onClick={() => changeMode(MODES.BET_HISTORY)}>Bet History</a>
                <a onClick={() => changeMode(MODES.PROFILE)}>Profile</a>
                <hr></hr>
                <p>Sport Categories</p>
                <CategorySports setSelectedSport={setSelectedSport}></CategorySports>
            </div>
        </div>
    )
}

export default HeaderNavbar