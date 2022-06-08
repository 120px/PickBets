import React from 'react'
import Login_Form from './Login_Form'
import SignUpForm from './SignUp_Form'
import { useState } from "react"

interface Props{
    handleModalChange: () => void
}

const Auth = ({handleModalChange} : Props) => {

    const [isLogIn, setLogIn] = useState(true)

    const changeAuthModalMode = () => {
        setLogIn(!isLogIn)
    }

    return (
        <div>
            {isLogIn === true ? 
            <Login_Form handleModalChange={handleModalChange} changeAuthModalMode={changeAuthModalMode}></Login_Form> 
            
            : <SignUpForm handleModalChange={handleModalChange} changeAuthModalMode={changeAuthModalMode}></SignUpForm>}
        </div>
    )
}

export default Auth