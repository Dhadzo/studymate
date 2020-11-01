import React, { useState, useEffect } from 'react'
import Notification from '../components/notification'
import { useSelector } from 'react-redux'
import { Spinner } from 'react-bootstrap'

const Notifications = () => {

    const [notifications,setNotifications] = useState([])
    const currentUser = useSelector(state => state.user.currentUser)
    const userToken = useSelector(state => state.user.userToken)

    useEffect(() => {
        fetch(`/api/notifications/${currentUser._id}`,{    
            headers: {
                'auth-token': `${userToken}`
            }
        })
        .then(response => response.json())
        .then(data => setNotifications(data))
      window.scrollTo(0,0)
    },[])

    return (
            <div style={styles.container}>
                    <div style={styles.notifications}  >
                        {
                            notifications.length>0?
                            notifications.map(notification => (
                                <Notification notification = {notification} />
                            ))
                            :<div className=" position-absolute" style={{marginLeft:'260px',marginTop:'150px'}}>
                              <Spinner animation="border" variant="white" />
                             </div>
                        }
                    </div>
            </div>
    )
}

const styles = {
    container:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        height:'100%',
        marginTop:'100px'
    },
    notifications: {
        width:'45%'
    }
}

export default Notifications