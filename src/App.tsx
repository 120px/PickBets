import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderNavbar from './Components/Layout/HeaderNavbar';
import BetSideBar from './Components/Layout/BetSideBar';
import MatchupsContainer from './Components/Layout/MatchupsContainer';
import BetCategorySideBar from './Components/Layout/BetCategorySideBar';
import { useEffect, useState } from 'react';
import "./CSS/Auth.css"
import { createHttpLink, useQuery } from '@apollo/client';
import { QUERY_WHOAMI } from "./GraphQL/QUERY_WHOAMI"
import Auth from './Pages/Auth/Register/Auth';
import { MODES } from './Models/Modes';
import BetHistory from './Components/History/BetHistory';
import { API_Data } from './Models/API_Data';
import {UserLoginContext} from "./Components/Context/UserLoginContext"


function App() {

  const link = createHttpLink({
    uri: "http://localhost:8181/graphql",
    credentials: "include"
  })

  const [isApiDataLoading, setIsApiDataLoading] = useState(false)
  const [apiData, setApiData] = useState<API_Data[] | undefined>()
  const { loading, error, data } = useQuery(QUERY_WHOAMI)
  const [toggleLoginModal, setToggleLoginModal] = useState(false)
  const [handleModeChange, setHandleModeChange] = useState(MODES.NORMAL)
  const [selectedSport, setSelectedSport] = useState("MLB")

  //not logged in
  if (loading) {

  }
  else if (!data) {

  } else {

  }

  const changeMode = () => {
    if (handleModeChange === MODES.BET_HISTORY) {
      setHandleModeChange(MODES.NORMAL)
    }
    else if (handleModeChange === MODES.NORMAL) {
      setHandleModeChange(MODES.BET_HISTORY)
    }
  }

  const handleModalChange = () => {
    setToggleLoginModal(!toggleLoginModal)
  }

  const onLoadGetOdds = async () => {
    try {
      await fetch("/MLB")
        .then(res => (res.json()))
        .then(json => setApiData((json)))
    }
    catch (err) {
      console.log(err)
    }
  }

  const getOdds = async () => {

    try {
      setIsApiDataLoading(true)
      await fetch("/" + selectedSport)
        .then(res => (res.json()))
        .then(json => setApiData((json)))

      setIsApiDataLoading(false)
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getOdds()

  }, [selectedSport])

  useEffect(() => {
    onLoadGetOdds()
  }, [])


  return (

    <div className="">
      <UserLoginContext.Provider value={data}>
        <HeaderNavbar changeMode={changeMode} handleModalChange={handleModalChange}></HeaderNavbar>

      </UserLoginContext.Provider>
      {toggleLoginModal === true ? <Auth handleModalChange={handleModalChange}></Auth> : null}

      {handleModeChange === MODES.NORMAL ?

        <div className='main-container'>
          <BetCategorySideBar setSelectedSport={setSelectedSport}></BetCategorySideBar>
          <MatchupsContainer isApiDataLoading={isApiDataLoading} selectedSport={selectedSport} apiData={apiData} data={data}></MatchupsContainer>
          <BetSideBar></BetSideBar>
        </div> : null}

      {handleModeChange === MODES.BET_HISTORY ?

        <div className='main-container'>
          <BetHistory changeMode={changeMode}></BetHistory>

        </div> : null}
    </div>
  );
}

export default App;
