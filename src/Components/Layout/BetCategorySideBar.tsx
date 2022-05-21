import React from 'react'
import "../../CSS/CategorySideBar.css"
import CategorySports from '../CategorySidebar/CategorySports'

const BetCategorySideBar = () => {
  return (
    <div className="category-sidebar-container">
      <div className='category-sidebar-inner'>
        <div className='text-center'>Categories</div>
          <div className='sidebar-contents'>
            <CategorySports></CategorySports>

          </div>

      </div>
    </div>
  )
}

export default BetCategorySideBar