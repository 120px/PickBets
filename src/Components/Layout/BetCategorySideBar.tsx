import React from 'react'
import "../../CSS/CategorySideBar.css"
import CategorySports from '../CategorySidebar/CategorySports'

interface Props{
  setSelectedSport: React.Dispatch<React.SetStateAction<string>>
}

const BetCategorySideBar = ({setSelectedSport} : Props) => {
  return (
    <div className="category-sidebar-container">
      <div className='category-sidebar-inner'>
        <div className='text-center category_header'>Categories</div>
          <div className='sidebar-contents'>
            <CategorySports setSelectedSport={setSelectedSport}></CategorySports>

          </div>

      </div>
    </div>
  )
}

export default BetCategorySideBar