import React, { useState, useEffect } from 'react'
import { Media } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser'
import { useSelector, useDispatch } from 'react-redux';
import { addAllDiscussions } from '../redux/posts/posts-actions'
import { userLikingPost } from '../redux/user/user.actions';
import ReactPlayer from 'react-player'
import VideoPlayer from './video-player';
import './post.styles.scss'

const Post = React.forwardRef(({discussion, height, width, top}, ref) => {
   
    const currentUser = useSelector(state => state.user.currentUser)
    const userToken = useSelector(state => state.user.userToken)
    const currentUserId = currentUser._id
    const dispatch =  useDispatch()
    const likePost =  () => {
        fetch(`/api/like/${discussion._id}`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': `${userToken}`
            },
            body: JSON.stringify({currentUserId})
        })
        .then(res => res.json())
        .then(data => {
            dispatch(addAllDiscussions(data.discussions))
        })
     }
   return (
      <div style={styles.container} className="postbody" ref={ref} width={width} height={height}>
                <Media className="p-2 mb-3 h-50"  style={{}}>
                    <p className="bg-dark rounded-circle  mr-1 text-white text-center mr-3" style={{width:'30px', height:'30px'}}>
                        <Link to={`/profile/${discussion.creator.username}`}>
                        <img src={discussion.creator.profilePic} className="h-100 w-100 rounded-circle"/>  
                        </Link>                      
                    </p>
                    <Media.Body>
                        <Link className="text-white" to={`/discussions/${discussion._id}`} style={{textDecoration:'none'}}>

                        <h6 className="font-weight-bold mb-2">
                           <Link  style={{color:'black',fontSize:'15px'}}  to={`/profile/${discussion.creator.username}`}>{discussion.creator.username}</Link>
                        </h6> 
                            <h4 className=" text-break font-weight-normal" style={{color:'black',fontSize:'15px'}}>{ReactHtmlParser(discussion.topic)}</h4>
                        {
                            discussion.video.length>0?
                                <VideoPlayer src={discussion.video} width={width} height={height} top={top} />
                            :null
                        }
                        {
                            discussion.image.length>0?
                                    <img src={discussion.image} style={styles.postImage} />
                            : null
                        } 
                        </Link>  
                        <div style={{display:'flex',justifyContent:'space-between', flexDirection:'row', marginTop:'10px', width:'90%'}}>
                           <Link to={`/discussions/${discussion._id}`} className="text-decoration-none">
                               <div style={styles.postfooter}>
                                  <i class="far fa-comment mr-1"  style={styles.icon}></i>
                                  <div >{discussion.messages.length}</div> 
                               </div>
                                    
                            </Link>                     
                            <Link className="text-decoration-none">
                                <div style={styles.postfooter}>
                                    <i class="fa fa-thumbs-up mr-1"  
                                       onClick={() => likePost()}   
                                        style={styles.icon}>
                                    </i>
                                    <div >{discussion.likes}</div> 
                                </div>
                            </Link>               
                            <Link className="text-decoration-none">
                                    <div style={styles.postfooter}>
                                        <i class="fa fa-share mr-1"  
                                            style={styles.icon}>
                                        </i>
                                        <div ></div> 
                                    </div>
                            </Link>
                            <Link className="text-decoration-none">
                                    <div style={styles.postfooter}>
                                        <i class="fas fa-eye-slash mr-1"  
                                            style={styles.icon}>
                                        </i>
                                        <div ></div> 
                                    </div>
                            </Link>
                        </div>
                    </Media.Body>
                </Media>
      </div>
   )

})
const  styles = {
   container: {
       //height: '550px',
       backgroundColor:'white',
      // background:'rgba(40,57,101,.9)',
       marginBottom:'10px',
       borderRadius:'5px',
       width:'550px'
       
   },
   postImage: {
       height:'360px',
       width: '440px',
   },
   icon:{
       cursor: 'pointer',
       fontSize:'18px',
       marginTop:'2px'
   },
   postfooter:{
       display:'flex',
       flexDirection:'row',
       alignItems:'center',
       color:'rgba(0,0,0,0.65)',

   }

}


export default Post