import React, {useState,useRef,useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom'
import { sendMessageStart, sendingMessageStatus } from '../redux/user/user.actions';
import  './chat-body.styles.scss'
import { Spinner } from 'react-bootstrap';

const ChatBody = ({match}) => {

   const [message, setMessage] = useState('');
   const [chat, setChat] = useState({user1:{}, user2:{}, messages:[], _id:''})
   const chatbox = useRef(null)
   const inputField = useRef(null)
   const dispatch = useDispatch()
   const currentUser = useSelector(state => state.user.currentUser)
   const userToken = useSelector(state => state.user.userToken)
   const currentUserId = currentUser._id
   let  mateName,mateId, chatId, img
   chatId = chat._id;
   if(chat.user1._id === currentUserId){
       mateName = chat.user2.username
       mateId = chat.user2._id
       img = chat.user2.profilePic
   }else{
       mateName = chat.user1.username
       mateId = chat.user1._id
       img = chat.user2.profilePic
   }
   
   useEffect(() => {
       fetch(`/api/chat/${match.params.chatId}`,{       
        headers: {
            'auth-token': `${userToken}`
        }
    })
       .then(response => response.json())
       .then(data => {
            setChat(data)
        })
   },[match])
   useEffect(() => {
       chatbox.current.scrollTop = 10000
       inputField.current.focus()
   })
   const handleSubmit = async event => {
        const message = inputField.current.value
        event.preventDefault();
        if(message.length > 0){
            dispatch(sendMessageStart({message,chatId,mateId,currentUserId}))
            dispatch(sendingMessageStatus())
            inputField.current.value = ''
            inputField.current.focus()
        }
   }
    return (
        <div className=" h-100 bg-transparent body "  >
            {
               chat ?
                 <div>
                    <div className=" p-3" style={{ height:'80px',fontSize:'20px', backgroundColor:'transparent'}}>
                        <div style={{ height:'80px',fontSize:'20px'}}>
                            <div style={{display:'flex', flexDirection:'row'}}>
                                <div style={{width:'50px', height:'50px'}}>
                                <Link to={`/profile/${mateName}`}>
                                    <img src={img} className=" w-100 h-100 rounded-circle" />
                                </Link>
                                </div>
                                <div className="chat-top">
                                    <Link to={`/profile/${mateName}`}>
                                    <div className=" text-white">{mateName}</div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    
                    </div>
                    <div ref={chatbox}className="overflow-auto mt-2 p-2 chat-box"style={{height:'320px', width:'100%',paddingBottom:'10px'}}>
                                {
                                    chat.messages?
                                    chat.messages.map(message => {
                                    return( 
                                        <p className={`${message.sender._id == currentUserId ? 'ml-auto sent-message' : 'mr-auto received-message'} text-white rounded  w-50 text-break`}>
                                            {message.message_body}
                                        </p>
                                    )})
                                    :<div className=" position-absolute" style={{marginLeft:'250px',marginTop:'120px'}}>
                                        <Spinner animation="border" variant="green" />
                                    </div>
                                }     
                    </div>
                    <div className="border-top" style={{height:'160px', fontSize:'20px'}}>
                        <form onSubmit={handleSubmit} className="d-flex flex-column  align-items-baseline">
                                <textarea ref={inputField}  type='text'  className=" send-input pl-3 border-bottom" placeholder="Write a new message"/>
                                <div className="message-options">
                                    <div className="left-options text-white">
                                    <i class="fas fa-paperclip"></i>
                                    <i class="far fa-smile"></i>
                                    </div>
                                    <button className="right-options" style={{backgroundColor:'rgba(40,57,101,.9)'}}>send</button>
                                </div>
                        </form>
                    </div>
                 </div>
               :<div className=" position-absolute" style={{marginLeft:'130px',marginTop:'150px'}}>
                    <Spinner animation="border" variant="white" />
                </div>
            }
           
        </div>
    );
}
export default ChatBody;