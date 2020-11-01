import React from 'react'
import Media from 'react-bootstrap/Media';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import './notification.styles.scss'

const  Notification = ({notification}) => {
    
    const currentUser = useSelector(state => state.user.currentUser)
    let pathname, search

    if(notification.type == "like-discussion"){
        pathname = `/profile/${currentUser.username}`
        search = `post-id=${notification.typeId}`
    }else if(notification.type == "comment"){
        pathname = `/discussions/${notification.parentId}`
        search = `comment-id=${notification.typeId}`
    }

    return (
        <div className="noti-body">
            <div>
            <Link to={{pathname:pathname, search:search}} className="text-decoration-none text">
                <Media className="" >
                    <p className="rounded-circle  mr-3" style={{width:'60px', height:'60px'}}>
                        <img src={notification.sender.profilePic} className="h-100 w-100 rounded-circle"/>                        
                    </p>
                    <Media.Body>
                        <h5 className="  font-weight-normal text-break" style={{color:'black', fontSize:'15px', marginTop:'10px'}}>{notification.body}</h5>
                    </Media.Body>
                </Media>
            </Link>
            </div>
        </div>
    )
}

export default Notification