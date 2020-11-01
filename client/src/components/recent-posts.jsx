import React, { useEffect } from 'react'
import Post from '../components/post'
import { useSelector, useDispatch } from 'react-redux'
import { addAllDiscussions } from '../redux/posts/posts-actions'

const RecentPosts = ()  => { 
  
    const dispatch = useDispatch()
    const discussions = useSelector(state => state.posts.allDiscussions)
    const userToken = useSelector(state => state.user.userToken)

    useEffect(() => {
        fetch('/api/discussions',{
            headers:{
                'auth-token':`${userToken}`
            }
        })
        .then(response => response.json())
        .then(data => {
            dispatch(addAllDiscussions(data.discussions))
        })
        window.scrollTo(0,0)
    },[])


    return (        
        <div>
            <h4 className="text-center" style={{marginBottom:'20px', fontFamily:'arial'}}>Recent Posts</h4>
            {
                discussions.map(discussion => (       
                        <Post discussion={discussion} width="440px" height="360px" top="130px"/>
                ))
            }
       </div> 
 
    )
}

export default RecentPosts