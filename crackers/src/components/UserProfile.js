import React from 'react'
import { useSelector } from 'react-redux'

function UserProfile() {
    const userImgUrl=useSelector((state)=>state.login.currentUser)
    console.log(userImgUrl)
    console.log(userImgUrl)
    console.log(userImgUrl.profileImageUrl)
  return (
    <div>UserProfile
<img src={userImgUrl.profileImageUrl} alt="" className='img-fluid' style={{maxHeight:'50px',borderRadius:'30%'}} />

    </div>

  )
}

export default UserProfile