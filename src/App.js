import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Pages/Auth/Register/SignUp';
import HeaderNavbar from './Components/Layout/HeaderNavbar';
import BetSideBar from './Components/Layout/BetSideBar';
import MatchupsContainer from './Components/Layout/MatchupsContainer';

import testData from "./data.json"

function App() {
  return (
    <div className="">
    <HeaderNavbar></HeaderNavbar>

    <div className='main-container'>
      <MatchupsContainer testData={testData}></MatchupsContainer>
      <BetSideBar></BetSideBar>
    </div>


    
      {/* <Signup></Signup> */}
    </div>
  );
}

export default App;
