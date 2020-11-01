import React from 'react';
import Media from 'react-bootstrap/Media';
import './chat-tab.styles.scss';
import { LinkStyles } from '../styled-components';
import { useSelector, useDispatch } from 'react-redux';


const ChatTab = ({chat}) => {
   
    const currentUser = useSelector(state => state.user.currentUser)
    const currentUserId = currentUser._id

    let mateName,mateId,img
    if(chat.user1._id === currentUserId){
        mateName = chat.user2.username
        mateId = chat.user2._id
        img = chat.user2.profilePic
    }else{
        mateName = chat.user1.username
        mateId = chat.user1._id
        img = chat.user1.profilePic
    } 
    return (
      <div className="  p-2" style={{height:'75px'}}>
          <div className="chat-tab h-100">
          <LinkStyles to={`/chats/${chat._id}`} className="text-decoration-none">
           <Media>
                <p  style={{width:'50px',height:'50px'}}>
                    <img src={img} className="h-100 w-100  rounded-circle" />
                </p>
                <Media.Body className="ml-1">
                    <div className=" mt-2" style={{fontFamily:'Arial, sans-serif', fontSize:'14px'}}>{mateName}</div>
                    <div style={{fontSize:'10px', display:'flex', flexDirection:'row', alignItems:'center', color:'grey', width:'40px', justifyContent:'space-between'}}><i class="fa fa-circle online" style={{color:'green'}}></i> online</div>
                    {/* <p className="">
                        {
                          chat.messages.length>0 ?  
                          chat.messages[chat.messages.length-1].message_body.substring(0,20)
                          :null
                        }
                    </p> */}
                </Media.Body>
            </Media>
            </LinkStyles>
          </div>
          
      </div>
    );
}
export default ChatTab;