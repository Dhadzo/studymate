import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOutSuccess } from '../redux/user/user.actions'
import AutocompleteInput from './autocomplete-input';
import './header.styles.scss'

const Header = () => {

    const currentUser = useSelector(state => state.user.currentUser)
    const [userHeader, setUserHeader] = useState(false)
    const [modalShow, setModalShow] = useState(false);
    const dropDownBox = useRef(null)
    const dispatch = useDispatch()

    useEffect(() => {
            document.addEventListener('click', handlerClick)
         
            return () => {
               document.removeEventListener('click', handlerClick)
            }
          
    },[userHeader,currentUser])

    const handlerClick = async e => {
        if(currentUser){
            if(dropDownBox.current.contains(e.target)){
                if(userHeader){
                    setUserHeader(false)
                }else{
                    setUserHeader(true)
                }
            }else {
                if(userHeader){
                    setUserHeader(false)
                }else{
                    setUserHeader(false)
                }
            }
        }
    }
    return (
    <header style={styles.header} className="shadow" >
            <nav style={styles.nav}>
                  <div style={styles.leftNav}>
                            <li style={{fontSize:'20px'}}>
                                <Link className="nav-link text-white" style={{fontFamily:'Grenze Gotisch, cursive'}} to = {'/'}>StudyMate</Link>
                            </li>
                            
                            {
                              currentUser 
                              ? <p style={{display:"flex",alignItems:'center',marginTop:'10px', marginLeft:'20px', marginRight:'300px'}}>
                                    <AutocompleteInput 
                                       placeholder='Search StudyMate...' 
                                       style={styles.searchBar} 
                                    />
                                </p>
                              : null
                          }
                            <li  style={styles.listItem}>
                                <Link to={'/home'} className="nav-link text-white" >{currentUser ? <i class="fas fa-home"></i >: null }</Link> 
                                
                            </li>
                            <li style={styles.listItem} >
                                <Link to={'/watch'} className="text-white" >{currentUser ? <i class="fab fa-youtube"></i> : null} </Link>
                            </li>
                            <li style={styles.listItem}>
                                 <Link to={'/new-post'} className="text-white">{currentUser ? <i class="fas fa-plus"></i>: null } </Link>
                            </li>
                            <li style={styles.listItem}>
                                 <Link to={'/chats'} className="text-white" >{currentUser ? <i class="fas fa-comment-dots"></i> : null}</Link>
                            </li>
                            <li style={styles.listItem}>
                                <Link to={'/notifications'} className="text-white">{currentUser ?<i class="fas fa-bell"></i> : null}</Link>
                            </li>
                            {
                              currentUser ?
                                   <div 
                                       className="rounded" 
                                       style={{  marginLeft:'60px', display:'flex', flexDirection:'column'}}
                                   >
                                      <Link
                                         className="text-white text-decoration-none"
                                      >
                                        <li 
                                            style={{display:'flex', alignItems:'center',flexDirection:'row',
                                                    justifyContent:'space-between', height:'30px',
                                                    paddingTop:'5px', paddingRight:'5px',paddingLeft:'5px',
                                                    border:'0px'
                                                }}
                                            ref={dropDownBox} name="dropDownBox"
                                        >
                                              <img src={currentUser.profilePic} style={styles.profileImage} className="rounded-circle" />
                                               <i class="ml-1 flex-end fas fa-caret-down"></i>                               
                                        </li>
                                        </Link>
                                        <div 
                                            style={{display:'flex', flexDirection:'column',alignItems:'start', marginTop:'10px'}} 
                                        >
                                            {
                                                userHeader ?
                                                        <ol className=" dropdownheader">
                                                            <li className=" border-bottom p-2">
                                                                Signed in as <strong>{currentUser.username}</strong>
                                                            </li>

                                                            <li className="m-2">
                                                                <Link  style={{color:'#c4c3ca'}} className="text-decoration-none" to={`/profile/${currentUser.username}`} >
                                                                   <i  class="fas fa-user-circle mr-2"></i>
                                                                   Your profile
                                                                </Link>
                                                            </li>
                                                            <li className="m-2">
                                                                <Link  style={{color:'#c4c3ca'}} className="text-decoration-none">
                                                                  <i class="fas fa-cog mr-2"></i>
                                                                  Settings
                                                                </Link>
                                                            </li>
                                                            <li className="m-2">

                                                                <Link 
                                                                   style={{color:'#c4c3ca'}}
                                                                    className="text-decoration-none"
                                                                    onClick={() =>{
                                                                        dispatch(signOutSuccess())
                                                                        setUserHeader(false)
                                                                    }}>
                                                                    <i class="fas fa-sign-out-alt mr-2"> </i>
                                                                    Sign out
                                                                </Link>
                                                            </li>
                                                        </ol>
                                                : null
                                            }
                                        </div>
                                   </div>
                                : null 
                            }
                           
                  </div>
                  <div style={styles.centerNav}>
                            
                  </div>
   
                  <div style={styles.rightNav}>
                      
                        <li style={styles.rightNavItem}>
                            <Link to="/signin"  className="text-white">{currentUser ? null : <i  class="fas fa-sign-in-alt "> <span style={{fontFamily:'Grenze Gotisch, cursive'}}>Sign In </span> </i> }</Link>
                        </li>
                        <li style={styles.rightNavItem}>
                            <Link to="/signup" className="text-white">{currentUser ? null : <i  class="fas fa-user-plus"> <span style={{fontFamily:'Grenze Gotisch, cursive'}}>Sign up</span> </i>}</Link>
                        </li>
                           
                    </div>
            </nav> 
        </header>
    );
}
const styles = {
    header: {
        alignItems:'center',
        backgroundColor: '#1f2029',
        position: 'fixed',
        marginBottom: '20px',
        width: '100%',
        height:'60px',
        zIndex:'20',


    },
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        listStyleType: 'none',
        alignItems:'center',
    },
    rightNav: {
        display: 'flex',
        justifyContent:'flex-end',
        alignItems:'center',
        marginRight:'60px',
        top:8,
        right:0,
        position:'fixed',

    },
    centerNav: {
        display: 'flex',
        marginLeft:'40px',
        alignItems:'center',
    },
    leftNav: {
        display: 'flex',
        justifyContent:'space-between',
        alignItems:'center',
        marginLeft:'20px', 
    },
    searchBar: {
       width:'300px',
       fontSize:'15px',
    },
    listItem: {
        marginLeft: '40px',
        fontSize:'30px'
    },
    rightNavItem:{
        marginLeft: '40px',
        fontSize:'22px'
    },
    profileImage: {
        height: '40px',
        width: '40px',
        marginRight: '5px',
        marginTop:'6px'
    }
}
export default Header;