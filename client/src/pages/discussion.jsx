import React, {useState, useEffect, useRef, useCallback} from 'react'
import Comment from '../components/comment'
import ReactHtmlParser from 'react-html-parser'
import VideoPlayer from '../components/video-player'
import { sendDiscussionMessage,sendingDiscussionMessageStatus } from '../redux/user/user.actions'
import { useDispatch, useSelector } from 'react-redux'
import { Media, Spinner } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';
import './discussion.styles.scss'


const Discussion = ({match,currentUser}) => {

    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const commentId = query.get('comment-id')

    const [discussion,setDiscussion] = useState({messages:[], _id:'', users:[], topic:'', creator:{}, __v:'', video:'', image:''})
    const currentUserId = currentUser._id
    const userToken = useSelector(state => state.user.userToken)
    const discussionId = match.params.discussionId
    const isSendDiscussionMsg = useSelector(state => state.user.isSendDiscussionMsg)
    const isSendingReply = useSelector(state => state.user.isSendingReply)
    const [inputValue,setInputValue] = useState('')
    const dispatch = useDispatch()
    const discussionBox = useRef(null)
    const comment = useRef(null)
    

    useEffect(() => {
           // discussionBox.current.scrollTop = discussionBox.current.scrollHeight + 100  
            fetch(`/api/discussions/${discussionId}`,{
                headers: {
                    'auth-token': `${userToken}`
                }
            })
            .then(response => response.json())
            .then(data => {
                setDiscussion(data.discussion)
            })

     },[isSendDiscussionMsg, isSendingReply,])

    useEffect(() => {
        //comment.current.focus()
        window.scrollTo(0,0)
    },[])
    
    const newComment = useCallback(node => {
        if(node !== null){
            window.scrollTo(0,0)
            node.scrollIntoView({ behavior: 'smooth'})
        }
    })

    const handleSubmit = event => {
            event.preventDefault()
            const message = inputValue
            if(message.length > 0){
                dispatch(sendDiscussionMessage({message,discussionId,currentUserId}))
                dispatch(sendingDiscussionMessageStatus())
                setInputValue('')

            }        
    }
    const handleChange = event => {
        setInputValue(event.target.value)
    }

    return (

             <div style={styles.container}>
                    <div ref={discussionBox} className="postDiv" style={{width:'60%',minHeight:"600px", backgroundColor:'white'}}>
                         {
                             discussion.image ?
                             <div>
                               <Media className="p-2 mb-3 h-50 w-100"  style={{}}>
                                <p className="bg-dark rounded-circle  mr-1 text-white text-center mr-1" style={{width:'40px', height:'40px'}}>
                                    <Link to={`/profile/${discussion.creator.username}`}>
                                        <img src={discussion.creator.profilePic} className="h-100 w-100 rounded-circle"/>  
                                    </Link>                      
                                </p>
                                <Media.Body>
                                    <h3>
                                        <Link className="font-weight-bold text-dark" to={`/profile/${discussion.creator.username}`}>
                                            {discussion.creator.username}
                                        </Link>
                                    </h3>
                                    <h4 className=" text-break" style={{color:'black', fontFamily:'arial',fontSize:'15px'}}>{ReactHtmlParser(discussion.topic)}</h4>
                                    {
                                        discussion.video.length>0?
                                        <VideoPlayer 
                                            src = {discussion.video} 
                                            width="700px" height="360px" top="130px"
                                        />
                                        : null
                                    }
                                    {
                                        discussion.image.length>0?
                                        <img src={discussion.image} style={styles.postImage} /> 
                                        : null
                                    } 
                                    <div style={{display:'flex',justifyContent:'space-between', flexDirection:'row', marginTop:'20px', width:'90%'}}>
                                    </div>
                                    
                                    </Media.Body>
                                </Media>
                    
                                <div style={styles.textarea} className="mb-5">
                                <p className="" style={{width:'30px', height:'30px'}}>
                                    <img src={currentUser.profilePic} style={{width:'100%',height:'100%'}} className="ml-2 rounded-circle" />
                                </p>
                                    <form onSubmit={handleSubmit} style={{width:'92%'}}>
                                    <input type='text' ref={comment} onChange={handleChange} style={{borderRadius:'10px', height:'50px', width:'90%'}} value={inputValue}  className=" border ml-1 pl-2" placeholder="Add a comment..." />
                                    </form>
                                </div>
                                {
                                    discussion.messages.map((message) => (
                                        <div>
                                    {
                                            message._id === commentId ?
                                            <Comment message={message} ref={newComment} sender={message.sender}  currentUserId={currentUserId} />
                                            : <Comment message={message}  sender={message.sender}  currentUserId={currentUserId} />
                                    }
                                    </div>
                                    ))
                                } 
                            </div>
                           :    <div className=" position-absolute" style={{marginLeft:'360px',marginTop:'200px'}}>
                                    <Spinner animation="border" variant="black" />
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
        marginTop:'100px',
        alignItems:'center'
    },
    postImage: {
        height:'380px',
        width: '90%',
    },
    textarea: {
        marginTop:'0px',
        height:'10px',
        marginBotton:'20px',
        width: '97%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    submitButton: {
        outline:'none',
        backgroundColor:'orange'
    }
}


export default Discussion