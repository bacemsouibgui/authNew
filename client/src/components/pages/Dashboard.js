import React from 'react'
import { useSelector } from 'react-redux';
import {Spinner} from 'reactstrap'

function Dashboard() {
  const user = useSelector((state)=> state.authReducer.user)
  console.log(user)

  if(!user) {
    return(
      // Spinner
      <div>
          <Spinner
    color="primary"
    style={{
      height: '3rem',
      width: '3rem'
    }}
  >
    Loading...
  </Spinner>
      </div>

    )
  }
  // if there is a user
  return (
    <div>
   <h1>{user.name}  {user.lastName}</h1>
   <h3>{user.email}</h3>
    </div>
  )
}

export default Dashboard;