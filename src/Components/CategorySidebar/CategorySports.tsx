import React from 'react'
import "../../CSS/CategorySports.css"


const CategorySports = () => {
  return (
    <div className=''>
        <div className='sport-category-container'>
            <img className='sports-icon' src={require("../../Media/Images/Categories/football_icon.png")} alt='icon'></img>
            <div>Football</div>
        </div>
        <div className='sport-category-container'>
            <img className='sports-icon' src={require("../../Media/Images/Categories/baseball_icon.png")} alt='icon'></img>
            <div>Baseball</div>
        </div>
        <div className='sport-category-container'>
            <img className='sports-icon' src={require("../../Media/Images/Categories/hockey_icon.png")} alt='icon'></img>
            <div>Hockey</div>
        </div>
        <div className='sport-category-container'>
            <img className='sports-icon' src={require("../../Media/Images/Categories/basketball_icon.png")} alt='icon'></img>
            <div>Basketball</div>
        </div>
        <div className='sport-category-container'>
            <img className='sports-icon' src={require("../../Media/Images/Categories/soccer_icon.png")} alt='icon'></img>
            <div>Soccer</div>
        </div>

    </div>
  )
}

export default CategorySports