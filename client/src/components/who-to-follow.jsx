import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import './who-to-follow.scss'


const WhoToFollow = ()  => { 

    const [RecommendedUsers, setRecommendedUsers] = useState([])
    const userToken = useSelector(state => state.user.userToken)
  
    useEffect(() => {
        fetch(`/api/who-to-follow`,{
            headers:{
                'auth-token':`${userToken}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setRecommendedUsers(data)
        })
    })

    return (        
        <div className="users">
        <div className="border-bottom pb-2 font-weight-bold">Who To Follow</div>
         {
             RecommendedUsers.length>0?
             RecommendedUsers.map(user => (
                 <div className="user"> 
                    <Link to={`/profile/${user.username}`} className="text-decoration-none">
                        <div className="d-flex flex-row align-items-center">
                            <img src={user.profilePic} className="userimg"/>
                            <div className="text-dark"> {user.username} </div>
                        </div>
                   </Link>
                   <button>Follow</button>
                </div>
             ))
            : <div className=" position-absolute" style={{marginLeft:'100px',marginTop:'150px'}}>
                <Spinner animation="border" variant="black" />
              </div>
         }
      </div>
 
    )
}

export default WhoToFollow