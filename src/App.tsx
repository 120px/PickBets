import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderNavbar from './Components/Layout/HeaderNavbar';
import BetSideBar from './Components/Layout/BetSideBar';
import MatchupsContainer from './Components/Layout/MatchupsContainer';
import BetCategorySideBar from './Components/Layout/BetCategorySideBar';
import { useEffect, useReducer, useState } from 'react';
import "./CSS/Auth.css"
import { createHttpLink, useQuery } from '@apollo/client';
import { QUERY_WHOAMI } from "./GraphQL/QUERY_WHOAMI"
import Auth from './Pages/Auth/Register/Auth';
import { MODES } from './Models/Modes';
import BetHistory from './Components/History/BetHistory';
import { API_Data } from './Models/API_Data';
import { UserLoginContext } from "./Components/Context/UserLoginContext"
import UserReducer from './Components/Context/UserReducer';
import UserProfile from './Components/Layout/UserProfile';
// import dummyData from "./data.json"
import dummyData from "./dataOdds.json"


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
  const [state, dispatch] = useReducer(UserReducer, { username: "CHANGED25" })
  const [currentDummyBets, setDummyBets] = useState([])

  //not logged in
  if (loading) {

  }
  else if (!data) {

  } else {

  }

  const changeMode = (mode: string) => {
    if (mode === MODES.NORMAL) {
      setHandleModeChange(MODES.NORMAL)
    }
    else if (mode === MODES.BET_HISTORY) {
      setHandleModeChange(MODES.BET_HISTORY)
    }
    else if (mode === MODES.PROFILE) {
      setHandleModeChange(MODES.PROFILE)
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

  const getOdds = async (retries = 3) => {
    try {
      setIsApiDataLoading(true)
      const response = await fetch("/" + selectedSport)
      if (!response.ok) throw new Error("Network response was not ok");
      const json = await response.json();
      setApiData(json);
      setIsApiDataLoading(false);
    } catch (err) {
      console.log(err)
      if (retries > 0) {
        setTimeout(() => {
          getOdds(retries - 1)
        }, 2000)
      } else {
        setIsApiDataLoading(false);
        console.error("Max retries reached. Fetch failed.")
        setApiData(dummyData)
      }
    }
  };

  useEffect(() => {
    getOdds()

  }, [selectedSport])

  useEffect(() => {
    onLoadGetOdds()
  }, [])


  return (

    <div className="">
      <UserLoginContext.Provider value={{ state, dispatch }}>
        <HeaderNavbar setSelectedSport={setSelectedSport} changeMode={changeMode} handleModalChange={handleModalChange}></HeaderNavbar>

        {toggleLoginModal === true ? <Auth handleModalChange={handleModalChange}></Auth> : null}

        {handleModeChange === MODES.NORMAL ?

          <div className='main-container'>
            <BetCategorySideBar setSelectedSport={setSelectedSport}></BetCategorySideBar>
            <MatchupsContainer isApiDataLoading={isApiDataLoading} selectedSport={selectedSport} apiData={apiData} data={data}></MatchupsContainer>
            <BetSideBar user_data={data}></BetSideBar>
          </div> : null}

      </UserLoginContext.Provider>

      {handleModeChange === MODES.BET_HISTORY ?

        <div className='main-container'>
          <BetHistory changeMode={changeMode}></BetHistory>

        </div> : null}

      {handleModeChange === MODES.PROFILE ?

        <UserProfile changeMode={changeMode} user_data={data}></UserProfile>

        : null}
    </div>
  );
}

export default App;
