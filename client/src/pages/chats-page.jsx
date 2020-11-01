import React, { useEffect, useState } from 'react';
import { useSelector, connect } from 'react-redux';
import ChatTab from '../components/chat-tab/chat-tab.component';
import ChatBody from '../components/chat-body.component';
import { Route, Switch } from 'react-router-dom';
import './chats-page.scss'
import { Spinner } from 'react-bootstrap';

const ChatsPage = ({match, isSending}) => {

    const [chats,setChats] = useState([])
    const currentUser = useSelector(state => state.user.currentUser)
    const userToken = useSelector(state => state.user.userToken)

    useEffect(() => {
        fetch(`/api/chats/${currentUser._id}`,{
            headers:{
                'auth-token':`${userToken}`
            }
        })
        .then(response => response.json())
        .then(data =>  {
            setChats(data)
        })
        
    },[isSending])
        return (
                <div style={styles.container}>
                     <div style={styles.chats} className="border-right">
                         <div className="new-message">

                         </div>
                         <div className="border-bottom searchchats">
                             <input type="search" className="searchBut" placeholder="Search chats..." />
                         </div>
                         <div style={styles.users}>
                            {
                                chats?
                                chats.map(chat => (
                                        <div className="ml-1" >
                                            <div className=" overflow-auto" >
                                                {
                                                        <ChatTab  chat={chat} /> 
                                                }
                                            </div>
                                        </div>
                                ))
                                :<div className=" position-absolute" style={{marginLeft:'130px',marginTop:'150px'}}>
                                    <Spinner animation="border" variant="white" />
                                </div>
                            }  
                         </div>
                     </div>
                    <div style={styles.chat}>
                        <Switch>
                            <Route  path={`${match.path}/:chatId`} render = {props => <ChatBody {...props}/>} />
                        </Switch> 
                    </div>
                </div>
   )        
}

const mapStateToProps = state => ({
    isSending: state.user.isSending
})

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop:'60px',
        width:'100%',
        height:'560px'
        
    },
    chats: {
        width: '20%',
        border:'1px solid white',
        backgroundColor: '#1f2029',
        backgroundImage: `url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg')`,
        boxShadow:' 0 8px 24px rgba(149,157,165,.2)',
    },
    chat: {
        width: '40%',
     	backgroundColor:'rgba(40,57,101,.9)',
        height:'560px',
        backgroundColor: '#1f2029',
        backgroundImage: `url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg')`,
        border: '1px solid white'
    },
    users: {
        overflow:'auto',
        height:'480px'
    }
}

export default connect(mapStateToProps)(ChatsPage);