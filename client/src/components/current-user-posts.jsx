import React, { useState, useEffect, useCallback } from 'react'
import Post from './post'
import { useSelector, useDispatch } from 'react-redux'
import { addAllDiscussions } from '../redux/posts/posts-actions'
import { useLocation } from 'react-router-dom'
import { updateUserProfile, refreshUser, signInSuccess, fetchUserProfile } from '../redux/user/user.actions';


const CurrentUserPosts = ({match})  => { 
  
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const postId = query.get('post-id')

    const dispatch = useDispatch()
    const discussions = useSelector(state => state.posts.allDiscussions)
    const [userPosts,setUserPosts] = useState([])
    const userToken = useSelector(state => state.user.userToken)
    

    const likedPost = useCallback(node => {
        if(node !== null){
            window.scrollTo(0,0)
            node.scrollIntoView({ behavior: 'smooth'})
        }
    })
    
    useEffect(() => {
        fetch(`/api/profile/${match.params.username}`,{   
            headers: {
                'auth-token': `${userToken}`
            }
        })
        .then(response => response.json())
        .then(data => {
              dispatch(fetchUserProfile(data.user))
              setUserPosts(data.userPosts)
        })
    },[])


    return (        
        <div>
            <h4 className="text-center" style={{marginBottom:'20px', fontFamily:'arial'}}>Posts</h4>
            {
              userPosts.map(post => (
                <div>
                    {
                        post._id == postId?
                           <Post discussion={post} ref={likedPost} width="440px" height="360px" top="130px"/>
                        :  <Post discussion={post} width="440px" height="360px" top="130px"/>
                    }
                </div>
                
            ))
            }
       </div> 
 
    )
}

export default CurrentUserPosts
