import React, { useState, useEffect, useRef } from 'react'
import { Media, Alert } from 'react-bootstrap'
import ReactHtmlParser from 'react-html-parser'
import { useSelector, useDispatch } from 'react-redux'
import { sendingReplyMessageStatus, sendReplyMessage } from '../redux/user/user.actions'
import Reply from './reply'
import {Link} from 'react-router-dom';


const Comment = React.forwardRef((props,ref) => {

   const [reply,setReply] = useState(false)
   const [replyValue,setReplyValue] = useState(props.sender.username)
   const [hideReplies,setHideReplies] = useState(true)
   const currentUser = useSelector(state => state.user.currentUser)
   const userToken = useSelector(state => state.user.userToken)
   const isSendingReply = useSelector(state => state.user.isSendingReply)
   const [replies,setReplies] = useState([])
   const replyInput = useRef(null)
   const dispatch = useDispatch()   
   const handleChange = (event) => {
      setReplyValue(event.target.value)
   }
   useEffect(() => {
      fetch(`/api/comment-replies/${props.message._id}`,{      
         headers: {
             'auth-token': `${userToken}`
         }
     })
      .then(res => res.json())
      .then(data => {
         setReplies(data)
      })
   },[isSendingReply])
   const  handleSubmit = event => {
      event.preventDefault()
      const reply = replyValue
      const messageId = props.message._id
      const senderId = currentUser._id
      if(reply.length > 0){
         dispatch(sendReplyMessage({reply,messageId, senderId}))
         dispatch(sendingReplyMessageStatus())
         setReplyValue('')
      }
   }
   const hideRepliesFunc = () => {
      setHideReplies(false)
   }
   return (
      <div style={styles.container} ref={ref}>
          <div style={styles.comment}>
            <Media className="p-1">
                <p className="" style={{width:'30px', height:'30px'}}>
                     <Link to={`/profile/${props.sender.username}`}>
                        <img src={props.sender.profilePic} style={{width:'100%',height:'100%'}} className=" ml-1 rounded-circle"/> 
                     </Link>                          
                </p>
                <Media.Body className="ml-2"  >
                  <div style={styles.body}>
                      <Link to={`/profile/${props.sender.username}`}>
                        <h6 style={{color:'black'}} className=" font-weight-bold m-0 mb-1">{props.sender.username}</h6>
                      </Link>
                      
                        <p style={{fontFamily:'sans-'}} className="w-100 text-break">
                           {ReactHtmlParser(props.message.message_body)}
                        </p>
                  </div>
                  <div>
                  </div>
                  <div style={styles.foot}>

                     <div
                          style={styles.icon}
                          onClick={() =>{
                           setReply(true)
                        }}
                     >
                          <i class="far fa-thumbs-up mr-3"> Like </i> 
                     </div>
                     <div 
                          style={styles.icon}
                          onClick={() =>{
                           setReply(true)
                           setReplyValue('')
                           replyInput.current.focus()
                        }}
                     >
                        <i class="fa fa-reply mr-3 d" > Reply </i>
                     </div> 
                     <div 
                        style={{cursor:'pointer'}}
                         onClick={() => {
                             hideRepliesFunc()
                         }}
                     >
                        {
                           replies.length > 0?
                              replies.length !== 1?
                                 <p>{replies.length} replies</p>
                              :  <p>{replies.length} reply</p>
                              :null
                        }
                     </div>    
                  </div>
                  <div style={{marginLeft:'100px'}}>

                     {
                        !hideReplies?
                        replies.map(reply => (
                           <div>
                             <Reply reply = {reply} />
                              <div style={{marginLeft:'50px', flexDirection:'row', display:'flex'}}>
                                 <div
                                    style={styles.icon}
                                 >
                                    <i class="far fa-thumbs-up mr-3"> Like </i> 
                                 </div>
                                 <div 
                                    style={styles.icon}
                                    onClick={() =>{
                                       setReply(true)
                                       setReplyValue(reply.sender.username)
                                    }}
                                 >
                                    <i class="fa fa-reply mr-3 d" > Reply </i>
                                 </div>     
                              </div>
                             </div>
                        ))
                        :null
                     }
                  </div>
                </Media.Body>
                
            </Media>            
            <div  style={{display:`${reply ? 'block': 'none'}`,marginLeft:'146px'}}  >
               {
                        <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'row'}} >
                           <p className="" style={{width:'30px', height:'30px'}}>
                              <img src={currentUser.profilePic} className="h-100 w-100 rounded-circle"/>                        
                           </p>
                           <input  value={replyValue} ref={replyInput} onChange={handleChange} type="text" placeholder="Add a reply..." style={{borderRadius:'10px', width:'85%'}} className=" border ml-2 pl-2" />
                        </form>
               }
            </div>
         </div> 

      </div>
   )

})
const  styles = {
   container: {
     marginBottom:'5px',
     width:'90%'
   },
   comment: {
       
   },
   body: {
       backgroundColor:'#E1E8ED',
       borderRadius: '10px',
       padding: '0px 0px 10px 10px'
   },
   foot: {
       display:'flex',
       flexDirection:'row',
       justifycontent:'space-between', 
       marginLeft:'10px',
       marginRight:'10px'      
   },
   icon: {
      cursor:'pointer'

   },
}


export default Comment