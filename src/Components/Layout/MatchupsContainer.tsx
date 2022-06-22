import React from 'react'
import "../../CSS/Matchups.css"
import { API_Data } from '../../Models/API_Data'
import Matchups from '../Card/Matchups'
import Spinner from 'react-bootstrap/Spinner'

interface Props{
  data: any
  apiData: API_Data[] | undefined
  selectedSport: string
  isApiDataLoading: boolean
}

const MatchupsContainer = ({data, apiData, selectedSport, isApiDataLoading} : Props) => {
  return (
    <div className="matchup-container">
      <div className='matchup-bet-header-container'>
        <div className='bet-header-contents'>
          <div className='header-sports-title'>
            
            <h3>{selectedSport}</h3>
            
          </div>

          <div className='header-bet-types'>
            <div className="bet-header-container">
              <div className="bet-header">Money line</div>
            </div>
            <div className="bet-header-container">
              <div className="bet-header">Spreads</div>
            </div>
            
          </div>
        </div>
      </div>

      {isApiDataLoading === true ? 
      
      <div className='text-center '>
        <p className='fetching_indicator'>Fetching live odds...</p>
        <Spinner className='loading_spinner' animation="border" variant="info" /> 
      </div>
      
      : <Matchups apiData={apiData} user_data={data}></Matchups>}

    </div>
  )
}

export default MatchupsContainer