import React, { useState } from 'react'
import "../../CSS/UserProfile.css"
import { BsPersonCircle } from "react-icons/bs";
import { useQuery } from '@apollo/client';
import { QUERY_GETBETSSTATS } from '../../GraphQL/QUERY_GETBETSSTATS';
import { Button } from 'react-bootstrap';
import { stringify } from 'querystring';
import { MODES } from '../../Models/Modes';

interface Props {
  user_data: any
  changeMode: (mode: string) => void
}

interface UpdatedUser {
  first_name: string,
  last_name: string,
  email: string
}

const UserProfile = ({ user_data, changeMode }: Props) => {

  const [updateUser, setUpdateUser] = useState<UpdatedUser>()
  const [toggleEdit, setToggleEdit] = useState(false)

  const handleEdit = () => {
    setToggleEdit(!toggleEdit)
  }

  const { loading, error, data } = useQuery(QUERY_GETBETSSTATS)
  console.log(data)

  return (
    <>

      <div className='bet_history__title'>
        <h5 onClick={() => changeMode(MODES.NORMAL)}>Return to home</h5>
      </div>

      {user_data.whoAmI !== null && data !== undefined ?
        <div className="profile-container">
          <div className='profile-contents'>
            <div className='user__icon'>
              <BsPersonCircle size={50}></BsPersonCircle>
            </div>

            <div className='user__information'>
              <div className='user__username'>
                <span>{user_data.whoAmI.username}</span>
              </div>

              <div className='user__personalInformation'>
                <h3>My Information</h3>
                <div className='user__firstname'>
                  {toggleEdit === false ?
                    <span>{user_data.whoAmI.first_name}</span>
                    : <input className='user__edit__firstname' type="text" placeholder={user_data.whoAmI.first_name}></input>}
                </div>

                <div className='user__lastname'>
                  {toggleEdit === false ? <span>{user_data.whoAmI.last_name}</span>
                    : <input className='user__edit__lastname' type="text" placeholder={user_data.whoAmI.last_name}></input>}

                </div>
                <div className='user__email'>
                  {toggleEdit === false ? <span>{user_data.whoAmI.email}</span>
                    : <input className='user__edit__email' type="text" placeholder={user_data.whoAmI.email}></input>}

                </div>

                {toggleEdit === true ? <Button>Submit</Button> : null}

                {/* <div className='user__createdAt'>
                  <span>DATE</span>
                </div> */}
              </div>

              <div className='user__statistics'>
                <h3>My Stats</h3>
                <div className='user__betsPlaced'>
                  <span>Total Bets: {data.getUserCountBets[0] + data.getUserCountBets[1]}</span>
                </div>
                <div className='user__betsWon'>
                  <span>Bets Won: {data.getUserCountBets[0]}</span>
                </div>
                <div className='user__betsLost'>
                  <span>Bets Lost: {data.getUserCountBets[1]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        : <h1 className='text-center'>Please Log In to view your profile</h1>}

      {/* <div className='text-center edit_btn'>
        <Button onClick={handleEdit}>Edit</Button>
      </div> */}

    </>
  )
}

export default UserProfile