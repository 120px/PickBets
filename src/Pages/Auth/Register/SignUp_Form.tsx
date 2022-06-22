import { useMutation } from '@apollo/client'
import React, { useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import "../../../CSS/Auth.css"
import { CREATE_USER } from '../../../GraphQL/CREATE_USER'
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsWindowSidebar } from 'react-icons/bs'

interface UserRegisterInput {
    email: string,
    first_name: string,
    last_name: string,
    password: string,
    username: string,
}

interface Props{
    changeAuthModalMode: () => void
    handleModalChange: () => void
}

const SignUpForm = ({changeAuthModalMode, handleModalChange} : Props) => {

    const [newUser, setNewUser] = useState<UserRegisterInput>({ email: "", first_name: "", last_name: "", password: "", username: "" })
    const [responseErrors, setResponseErrors] = useState("")
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [userRegister, { error }] = useMutation(CREATE_USER)
    const errorUsername = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    const errorEmail = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    const errorRegex = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    const errorLengthUsername = React.useRef() as React.MutableRefObject<HTMLInputElement>;

    const addUser = async () => {
        
        const potentialUser = await userRegister({
            variables: {
                userInput: {
                    first_name: newUser.first_name,
                    last_name: newUser.last_name,
                    email: newUser.email,
                    password: newUser.password,
                    username: newUser.username
                }
            }
        })

        if (potentialUser.data){
            
            if(potentialUser.data?.userRegister.errors == null){
                setShowConfirmationModal(true)

                return
            }

            if (await potentialUser.data?.userRegister.errors[0].field === "username"){
                errorUsername.current.focus()
                errorUsername.current.className = "display_input_error"
                setResponseErrors(potentialUser.data?.userRegister.errors[0].message)
                return
            }

            if (potentialUser.data?.userRegister.errors[0].field === "email"){
                errorEmail.current.focus()
                errorEmail.current.className = "display_input_error"
                await setResponseErrors(potentialUser.data?.userRegister.errors[0].message)
                return
            }

        }else{
            await setResponseErrors("Your account has been created successfully!")
        
        }

    }

    const handleConfirmationClick = () => {
        window.location.reload()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setNewUser({ ...newUser, [name]: value })
    }

    const handleOnSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (newUser.email === null || newUser.first_name === "" || newUser.last_name === "" || newUser.password == "" || newUser.username == ""){
            errorRegex.current.innerText = "Please fill out all inputs"
            return
        }

        if (newUser.username.length < 2){
            errorRegex.current.innerText = "Username must be greater than 2 characters"
            return
        }

        if (EMAIL_REGEX.test(newUser.email) === false){
            errorRegex.current.innerText = "Please enter a valid email address"
            errorEmail.current.focus()
            return
        }
        addUser()
    }

    return (
        <div>
            <form className='signup-form-container' onSubmit={handleOnSubmit}>
                <div className='signup-form'>
                    
                    <div className='btn-exit-modal' onClick={handleModalChange}>
                        <AiOutlineCloseCircle size={"30"}></AiOutlineCloseCircle>
                    </div>

                    <div className="form-header">
                        <h2>Ready to become a <span id="emphasis__winner">winner</span>?</h2>
                    </div>

                    <div className="display_register_error">
                        {responseErrors !== null ? responseErrors : null}
                        <p ref={errorRegex}></p>
                    </div>

                    <div className='form-contents'>
                        <div className='user__nameinfo'>
                            <input name="first_name" type="text" onChange={handleChange} placeholder='first name'></input>
                            <input name="last_name" type="text" onChange={handleChange} placeholder='last name'></input>
                        </div>

                        <div className="user__accountinfo">
                            <input ref={errorUsername} name="username" type="text" onChange={handleChange} placeholder='username'></input>
                            <input ref={errorEmail} name="email" type="text" onChange={handleChange} placeholder='email'></input>
                            <input name="password" type="password" onChange={handleChange} placeholder='password'></input>
                        </div>
                    </div>

                    <div className="btnSignUp">
                    {showConfirmationModal === false ? 
                        <Button type={"submit"}>Sign Up</Button>
                   
                    : <Button onClick={handleConfirmationClick}>Continue</Button>}
                    </div>

                    <div>
                        <a id="switch_auth_modes" onClick={changeAuthModalMode}>Already have an account? Log in here</a>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignUpForm