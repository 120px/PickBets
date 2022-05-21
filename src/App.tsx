import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderNavbar from './Components/Layout/HeaderNavbar';
import BetSideBar from './Components/Layout/BetSideBar';
import MatchupsContainer from './Components/Layout/MatchupsContainer';
import testData from "./data.json"
import BetCategorySideBar from './Components/Layout/BetCategorySideBar';
import { useEffect, useState } from 'react';
import Button from "react-bootstrap/Button"
import SignUpForm from './Pages/Auth/Register/SignUp_Form';
import "./CSS/Auth.css"
import Login_Form from './Pages/Auth/Register/Login_Form';
import { useQuery } from '@apollo/client';
import { QUERY_WHOAMI } from "./GraphQL/QUERY_WHOAMI"

function App() {

  const [loggedIn, setIsLoggedIn] = useState(false)
  const { loading, error, data } = useQuery(QUERY_WHOAMI)

  const checkIfLoggedIn = () => {

  }

  useEffect(() => {
    fetch("/")
    console.log(data)

  }, [])



  return (

    <div className="">
      <HeaderNavbar></HeaderNavbar>
      {/* <Button onClick={doSomething}>PUSH</Button> */}

      {loggedIn === true ? <Button>Log in</Button> : <Login_Form></Login_Form>}

      <div className='main-container'>
        <BetCategorySideBar></BetCategorySideBar>
        <MatchupsContainer ></MatchupsContainer>
        <BetSideBar></BetSideBar>
      </div>

      {/* <Signup></Signup> */}
    </div>
  );
}

export default App;
