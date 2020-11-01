import React,{useState, useRef, useEffect, useCallback} from 'react'
import Media from 'react-bootstrap/Media';
import {useSelector, useDispatch} from 'react-redux'
import { updateUserProfile, refreshUser, signInSuccess, fetchUserProfile } from '../redux/user/user.actions';
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';
import './profile.scss'
import CurrentUserPosts from '../components/current-user-posts';
import RepliedPosts from '../components/replied-posts';
import LikedPosts from '../components/liked-posts';
import SharedPosts from '../components/shared-posts';
import { Route, Switch } from 'react-router-dom';
import EditProfileModal from '../components/edit-profile-modal';
import HomePage from './homepage';
import { Spinner } from 'react-bootstrap';


const Profile = ({match, history}) => {

    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const postId = query.get('post-id')

    const [modalShow, setModalShow] = useState(false);
    const currentUser = useSelector(state => state.user.currentUser)
    //const userProfile = useSelector(state => state.user.userProfile)
    const userToken = useSelector(state => state.user.userToken)
    const [userPosts,setUserPosts] = useState([])
    const [userProfile, setUserProfile] = useState({_id:"",name:"",username:"", profilePic:"", })
    const dispatch = useDispatch()
    const currentUserId = currentUser._id
    const uploadedFile = useRef(null)
    const image = useRef(null)
    const test = useRef(null)
    const [upload,setUpload] = useState(false)
    const [selectedFile,setSelectedFile] = useState(null)
    const [img,setImg] = useState(currentUser.profilePic)
    console.log(currentUser)
  
    useEffect(() => {
        fetch(`/api/profile/${match.params.username}`,{
            headers:{
                'auth-token':`${userToken}`
            }
        })
        .then(response => response.json())
        .then(data => {
              setUserProfile(data.user)
              setUserPosts(data.userPosts)
        })

    },[match])
    useEffect(() => {
        window.scrollTo(0,0)
    },[])

    
    useEffect(() => {
        setImg(currentUser.profilePic)
    },[currentUser])
     
    const messageUser = () => {
        fetch(`/api/addmate/${userProfile._id}`, {
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'auth-token':`${userToken}`
            },
            body: JSON.stringify({mateId:userProfile._id, userId:currentUser._id})
        }).then(response => response.json())
        .then(data => {
              dispatch(updateUserProfile(data.user))
              history.push(`/chats/${data.Id}`)
           })
    }
 
    return (
     <div>
       <div>
           <div className="topDiv">
               
           {
                userProfile ?
                <Media style={{display:'flex',flexDirection:'column',  alignItems:'center', marginTop:'50px'}}  >
                    <div style={{width:'500px', height:'300px', }}>
                            {
                                userProfile.profilePic?
                                <img src={userProfile.profilePic}  style={{width:'100%', height:'100%'}}   ref={image}/>
                                : <div className=" position-absolute" style={{marginLeft:'220px',marginTop:'150px'}}>
                                    <Spinner animation="border" variant="black" />
                                </div>
                            }
                    </div>
                    <div className="text-center"
                    onClick={() => setModalShow(true)}
                    >
                        <h1  className="font-weight-bold mb-0">{userProfile.name}</h1>
                        <h6>{userProfile.username}</h6>
                    </div>
                    <EditProfileModal history={history} userProfile={userProfile} show={modalShow} onHide = {() => setModalShow(false)} />
                     <div className="profileOptions">
                        {
                            currentUser._id == userProfile._id?
                                    <p className="ml-5"
                                        onClick={() => setModalShow(true)}
                                    >
                                        Edit profile 

                                    </p>                               
                            :  <p className="ml-5"
                                onClick = {() => messageUser()}
                               > 
                                  Message
                                </p>

                        }
                        <p className="ml-5">30 Followers</p>
                        <p className="ml-5">11 Following</p>
                            
                    </div>   
                    <Media.Body>
                    </Media.Body> 
                </Media>
                : <div className=" position-absolute" style={{marginLeft:'360px',marginTop:'200px'}}>
                    <Spinner animation="border" variant="black" />
                  </div>
                
             }
                       
           </div>

        
        <div  className="container" >
            <div  className="midDiv">
                  {
                   userProfile?
                     <div> 
                      
                    <div>
                        {
                            currentUser._id == userProfile._id?
                            <div className="newPostDiv">
                                <div style={{display:'flex', flexDirection:'row', alignContent:'center', marginTop:'15px'}}>
                                    <p className="" style={{width:'40px', height:'40px'}}>
                                        <img src={currentUser.profilePic} style={{width:'100%',height:'100%'}} className="rounded-circle" />
                                    </p>
                                    <form  >
                                        <Link to={'/new-post'}>
                                        <input type='text' onChange={() => history.push('/new-post') }  style={{borderRadius:'5px', height:'40px', width:'480px', backgroundColor:'#E1E8ED'}}   className=" ml-2 pl-2" placeholder="Create a new Post" />
                                        </Link>
                                    </form>
                                </div>
                            </div>
                            :null
                        }
                    </div> 
                    <div className="displayedPostsOptions">                        
                          <Link to={`/profile/${userProfile.username}` } className="option text-decoration-none"> 
                             <i class="fas fa-edit mr-1 text-primary"></i>
                             <span className="text">Posts</span> 
                          </Link> 
                           <Link to={`/profile/${userProfile.username}/replies`} className="option text-decoration-none"> 
                              <i class="fas fa-reply-all mr-1 text-info"></i>
                              <span className="text">Replies</span> 
                           </Link> 

                           <Link to={`/profile/${userProfile.username}/likes`} className="option text-decoration-none"> 
                              <i class="fas fa-heart mr-1 text-danger"></i>
                              <span className="text">Likes</span>
                            </Link> 
                            <Link to={`/profile/${userProfile.username}/shared`} className="option text-decoration-none"> 
                              <i class="fa fa-share mr-1 text-success"></i>
                              <span className="text" >Shared</span> 
                            </Link> 
                    </div>
                      <Switch>
                            <Route path={`${match.path}/shared`} component={SharedPosts} />
                            <Route path={`${match.path}/likes`} component={LikedPosts} />
                            <Route path={`${match.path}/replies`} component={RepliedPosts} />
                            <Route path={`${match.path}`} component={CurrentUserPosts} />
                      </Switch>
                          
                    </div>          
                  :null
                }  
                  </div>  
            </div>
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
        marginTop:'60px'
    },
    midDiv: {
        width: '45%',
        display:'flex',
        flexDirection:'column',

    },
    displayedPostsOption:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        maxWidth:'550px',
        padding:'10px',
        borderRadius:'5px',
        backgroundColor:'white',
        height: '40px',
        marginBottom:'20px',
        fontFamily:'sans',
        fontSize:'17px'
    },
    newPostDiv:{
        display:'flex',
        flexDirection:'column',
        backgroundColor:'white',
        maxWidth:'550px',
        height: '80px',
        marginBottom:'20px',
        padding:'10px',
        borderRadius:'5px',
        justifyContent:'center'
    }
}


export default Profile