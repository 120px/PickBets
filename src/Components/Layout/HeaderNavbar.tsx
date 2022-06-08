import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import "../../CSS/HeaderNavBar.css"
import SignUpForm from '../../Pages/Auth/Register/SignUp_Form'
import Login_Form from '../../Pages/Auth/Register/Login_Form'
import { useMutation, useQuery } from '@apollo/client'
import { LOGOUT_USER } from '../../GraphQL/LOGOUT_USER'
import { QUERY_WHOAMI } from '../../GraphQL/QUERY_WHOAMI'
import { MODES } from '../../Models/Modes'
import User from './User'
import { BsPersonCircle } from "react-icons/bs";

interface Props {
    handleModalChange: () => void
    changeMode: () => void

}

const HeaderNavbar = ({ handleModalChange, changeMode }: Props) => {

    const { loading, error, data } = useQuery(QUERY_WHOAMI)
    const [userLogOut,] = useMutation(LOGOUT_USER)

    const doUserLogout = () => {
        userLogOut()

        // window.location.reload()
    }

    let authSection = null

    //not logged in
    if (loading) {

    }
    else if (data.whoAmI === null) {
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
                        {/* <User></User> */}
                        <span>{data.whoAmI.username}</span>
                        <span>${(data.whoAmI.account_balance.toFixed(2))}</span>
                    </div>
                    <Button onClick={() => { doUserLogout() }}>Logout</Button>
                </div>

            </>
        )
    }

    return (
        <div className='header-container'>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">PickBets</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home" onClick={changeMode}>Bet History</Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        {authSection}
                    </Form>

                </Container>

            </Navbar>
        </div>
    )
}

export default HeaderNavbar