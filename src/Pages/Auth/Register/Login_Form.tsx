import React, { useContext, useReducer, useState } from 'react'
import "../../../CSS/Auth.css"
import { Button } from "react-bootstrap"
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../../../GraphQL/LOGIN_USER'
import { AiOutlineCloseCircle } from "react-icons/ai";
import {UserLoginContext} from "../../../Components/Context/UserLoginContext"

interface UserLogin {
  username: string
  password: string
}

interface Props {
  changeAuthModalMode: () => void
  handleModalChange: () => void
}

const Login_Form = ({ changeAuthModalMode, handleModalChange }: Props) => {

  const [user, setUser] = useState<UserLogin>({
    username: "",
    password: ""
  })

  const [userLoginIn, { error }] = useMutation(LOGIN_USER)
  const {dispatch} = useContext(UserLoginContext)

  const loginUser = async () => {
    const logginInUser = await userLoginIn({
      variables: {
        passwordInput: user.password,
        usernameInput: user.username
      },    
    })

    if (!logginInUser.data?.userLogin.errors){
      window.location.reload()
      
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const handleOnSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    loginUser()

  }

  return (
    <form className='signup-form-container' onSubmit={handleOnSubmit}>

      <div className='signup-form'>

        <div className='btn-exit-modal' onClick={handleModalChange}>
          <AiOutlineCloseCircle size={"30"}></AiOutlineCloseCircle>
        </div>

        <div className="form-header">
          <h2>Welcome back!</h2>
        </div>

        <div className='form-contents'>

          <div className="user__accountinfo">
            <input name="username" onChange={handleChange} type="text" placeholder='username'></input>
            <input type="password" name="password" onChange={handleChange} placeholder='password'></input>
          </div>
        </div>

        <div className="btnSignUp">
          <Button type={"submit"}>Log In</Button>
        </div>

        <div>
          <a id="switch_auth_modes" onClick={changeAuthModalMode}>Need an account? Sign up here</a>
        </div>

      </div>
    </form>
  )
}

export default Login_Form