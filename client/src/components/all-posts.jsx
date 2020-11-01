import React, { useEffect, useState } from 'react'
import Post from '../components/post'
import { useSelector } from 'react-redux'
import { Spinner } from 'react-bootstrap'

const AllPosts = ()  => { 
  
    const [discussions, setDiscussions] = useState([])
    const userToken = useSelector(state => state.user.userToken)
    useEffect(() => {
        fetch('/api/discussions',{
            headers: {
                'auth-token': `${userToken}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setDiscussions(data.discussions)
        })
        window.scrollTo(0,0)
    },[])


    return (        
        <div>
            {
                discussions.length>0 ?
                discussions.map(discussion => (       
                        <Post discussion={discussion} width="440px" height="360px" top="130px" />
                ))
                : <div className=" position-absolute" style={{marginLeft:'-30px',marginTop:'100px'}}>
                    <Spinner animation="border" variant="white" />
                </div>
            }
       </div> 
 
    )
}

export default AllPosts