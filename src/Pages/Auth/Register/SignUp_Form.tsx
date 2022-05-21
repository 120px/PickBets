import { useMutation } from '@apollo/client'
import React, { useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import "../../../CSS/Auth.css"
import { CREATE_USER } from '../../../GraphQL/CREATE_USER'

interface UserRegisterInput {
    email: string,
    first_name: string,
    last_name: string,
    password: string,
    username: string,
}

const SignUpForm: React.FC = ({ }) => {

    const [newUser, setNewUser] = useState<UserRegisterInput>({ email: "", first_name: "", last_name: "", password: "", username: "" })
    const [responseErrors, setResponseErrors] = useState("")
    const [userRegister, { error }] = useMutation(CREATE_USER)
    const errorUsername = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    const errorEmail = React.useRef() as React.MutableRefObject<HTMLInputElement>;

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
            console.log(potentialUser.data?.userRegister.errors[0].field)
            console.log(potentialUser.data?.userRegister.errors[0].message)

            if (potentialUser.data?.userRegister.errors[0].field === "username"){
                errorUsername.current.focus()
                errorUsername.current.className = "error"
            }

            if (potentialUser.data?.userRegister.errors[0].field === "email"){
                errorEmail.current.focus()
                errorUsername.current.className = ""
                errorEmail.current.className = "error"
            }

            await setResponseErrors(potentialUser.data?.userRegister.errors[0].message)
        }else{
            await setResponseErrors("Your account has been created successfully!")
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setNewUser({ ...newUser, [name]: value })
    }

    const handleOnSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        addUser()

    }

    

    return (
        <div>
            <form className='signup-form-container' onSubmit={handleOnSubmit}>
                <div className='signup-form'>

                    <div className="form-header">
                        <h2>Ready to become a <span id="emphasis__winner">winner</span>?</h2>
                    </div>

                    <div className="display_error">
                        {responseErrors !== null ? responseErrors : null}
                    </div>

                    <div className='form-contents'>
                        <div className='user__nameinfo'>
                            <input name="first_name" type="text" onChange={handleChange} placeholder='first name'></input>
                            <input name="last_name" type="text" onChange={handleChange} placeholder='last name'></input>
                        </div>

                        <div className="user__accountinfo">
                            <input ref={errorUsername} name="username" type="text" onChange={handleChange} placeholder='username'></input>
                            <input ref={errorEmail} name="email" type="text" onChange={handleChange} placeholder='email'></input>
                            <input name="password" type="text" onChange={handleChange} placeholder='password'></input>
                        </div>
                    </div>

                    <div className="btnSignUp">
                        <Button type={"submit"}>Sign Up</Button>
                    </div>

                    <div>
                        <a >Already have an account? Log in here</a>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignUpForm