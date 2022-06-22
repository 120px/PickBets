import React from 'react'
import "../../CSS/CategorySports.css"

interface Props{
    setSelectedSport: React.Dispatch<React.SetStateAction<string>>
}

const CategorySports = ({setSelectedSport} : Props) => {

    const handleChangeSport = (event: React.MouseEvent<HTMLElement>) =>{
        setSelectedSport(event.currentTarget.id.toString())
    }

    return (
        <div className=''>
            <div onClick={handleChangeSport} id="NCAAF" className='sport-category-container'>
                <img className='sports-icon' src={require("../../Media/Images/Categories/football_icon.png")} alt='icon'></img>
                <div>Football</div>
            </div>

            <div onClick={handleChangeSport} id="MLB" className='sport-category-container'>
                <img className='sports-icon' src={require("../../Media/Images/Categories/baseball_icon.png")} alt='icon'></img>
                <div>Baseball</div>
            </div>

            <div onClick={handleChangeSport} id="NHL" className='sport-category-container'>
                <img className='sports-icon' src={require("../../Media/Images/Categories/hockey_icon.png")} alt='icon'></img>
                <div>Hockey</div>
            </div>

            <div onClick={handleChangeSport} id="NBA" className='sport-category-container'>
                <img className='sports-icon' src={require("../../Media/Images/Categories/basketball_icon.png")} alt='icon'></img>
                <div>Basketball</div>
            </div>

            <div onClick={handleChangeSport} id="SOCCER" className='sport-category-container'>
                <img className='sports-icon' src={require("../../Media/Images/Categories/soccer_icon.png")} alt='icon'></img>
                <div>Soccer</div>
            </div>

            {/* <div onClick={handleChangeSport} id="MMA" className='sport-category-container'>
                <img className='sports-icon' src={require("../../Media/Images/Categories/MMA_icon.png")} alt='icon'></img>
                <div>MMA</div>
            </div> */}

        </div>
    )
}

export default CategorySports