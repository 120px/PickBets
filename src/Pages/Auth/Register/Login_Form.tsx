import React, { useState } from 'react'
import "../../../CSS/Auth.css"
import { Button } from "react-bootstrap"
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../../../GraphQL/LOGIN_USER'

interface UserLogin {
  username: string
  password: string
}

const Login_Form = () => {

  const [user, setUser] = useState<UserLogin>({
    username: "",
    password: ""
  })

  const [userLoginIn, { error }] = useMutation(LOGIN_USER)

  const loginUser = async () => {
    const logginInUser = await userLoginIn({
      variables: {
        passwordInput: user.password,
        usernameInput: user.username
      }
    })

    console.log(logginInUser)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
    console.log(user)
  }

  const handleOnSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    loginUser()

  }

  return (
    <form className='signup-form-container' onSubmit={handleOnSubmit}>

      <div className='signup-form'>

        <div className="form-header">
          <h2>Welcome back!</h2>
        </div>

        <div className='form-contents'>

          <div className="user__accountinfo">
            <input name="username" onChange={handleChange} type="text" placeholder='username'></input>
            <input name="password" onChange={handleChange} type="text" placeholder='password'></input>
          </div>
        </div>

        <div className="btnSignUp">
          <Button type={"submit"}>Log In</Button>
        </div>

        <div>
          <a >Need an account? Sign up here</a>
        </div>

      </div>
    </form>
  )
}

export default Login_Form