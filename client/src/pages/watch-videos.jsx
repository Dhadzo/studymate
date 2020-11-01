import React, { useEffect } from 'react'
import Post from '../components/post'
import { useSelector, useDispatch } from 'react-redux'
import { addWatchVideos } from '../redux/posts/posts-actions'

const WatchVideos = ()  => { 
  
    const watchVideos = useSelector(state => state.posts.watchVideos)
    const userToken = useSelector(state => state.user.userToken)
    const dispatch = useDispatch()

    useEffect(() => {
        fetch('/api/watch-videos',{
            headers: {
                'auth-token': `${userToken}`
            }
        })
        .then(response => response.json())
        .then(data => {
            dispatch(addWatchVideos(data))
        })
    },[])

    return (        
        <div style={styles.container} >
            <div style={styles.posts}>
            <h5 style={{marginBottom:'10px', fontFamily:'arial'}}>Top videos for you</h5>
            {
                watchVideos.map(video => (       
                         <Post discussion={video} height="500px" width="840px" top="200px"  />
                ))
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
        marginTop:'70px'
    },
    posts: {
        width:'70%'
    }
}


export default WatchVideos