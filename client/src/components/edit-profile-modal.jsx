import React from 'react'
import  {Col,Row, Modal, Container, Button} from 'react-bootstrap'
import { useRef } from 'react'
import { useState } from 'react'
import { refreshUser, signInSuccess, fetchUserProfile } from '../redux/user/user.actions';
import Subject from './subject-paragraph'
import './edit-profile-modal.styles.scss'
import $ from 'jquery'
import { useSelector, useDispatch } from 'react-redux'
import { updateUserProfile } from '../redux/user/user.actions'
import axios from 'axios'


const  EditProfileModal = (props) =>  {

  const currentUser = useSelector(state => state.user.currentUser)  
  const userToken = useSelector(state => state.user.userToken)
  const currentUserId = currentUser._id
  const subjectField = useRef(null)
  const [subject,setSubject] = useState('')
  const [subjectsAdded,setSubjectsAdded] = useState([])
  const [name,setName] = useState(currentUser.name)
  const [username,setUsername] = useState(currentUser.username)
  const dispatch = useDispatch()
  const [upload,setUpload] = useState(false)
  const [selectedFile,setSelectedFile] = useState(null)
  const [img,setImg] = useState(currentUser.profilePic)
  const uploadedFile = useRef(null)
  const image = useRef(null)

  const previewImage = event => {
    setUpload(false)
    const reader = new FileReader()
    const file = uploadedFile.current.files[0]
    reader.addEventListener('load', () => {
        image.current.src = reader.result
        setSelectedFile(uploadedFile.current.files[0])
        setUpload(true)
        },false)
    if(file){
      reader.readAsDataURL(file)
    }
  }
  const updatePicture = () => {
    if(upload){
      const ext = selectedFile.name.split('.').pop()
      const newFileName = currentUserId+'.'+ext
      const formData = new FormData()
      formData.append("file",selectedFile,newFileName)
      axios.post(`/api/change-profile-pic/${currentUserId}`,{   
        headers: {
            'auth-token': `${userToken}`
        }
    }, formData, {})
      .then(response => dispatch(signInSuccess(response.data)))
      .then(() => setImg(currentUser.profilePic))
      setUpload(false)
    }
  }
  const updateNameAndUsername = () => {
    if(username != currentUser.username && name != currentUser.name){
      fetch('/api/edit-profile', {
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'auth-token': `${userToken}`

        },
        method:'POST',
        body: JSON.stringify({
          name,username,currentUserId
        })
      }).then(response => response.json())
       .then(data => dispatch(signInSuccess(data)))
    }
  }
  const  handleNameChange = event => {
       setName(event.target.value)
  }
  const  handleUsernameChange = event => {
    setUsername(event.target.value)
  }
   return (
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter modalcolor ">
        <Modal.Body  className="modalcolor">
           <div className="" >
             <label for="name" className="font-weight-bold">Name</label>
             <input className="border-dark rounded-0 inputstyle"
              onChange={handleNameChange}
             type="text" value={name} name="name"/>
           </div>
           <div className="p-1">
             <label for="username" className="font-weight-bold">Username</label>
             <input className="border-dark rounded-0 inputstyle"
              onChange={handleUsernameChange}
             type="text" value={username} name="username"/>
           </div>
           <div className=" align-items-baseline p-1" style={{display:'flex', flexDirection:"row", justifyContent:'space-between'}}>
             <label className="font-weight-bold">Profile picture</label>
            <label className="text-nowrap font-weight-bold modal-btn"  >
                  <i class="fas fa-plus"></i>
                  <input type="file" name="filename" accept="image/*" className=" d-none" onChange={previewImage} ref={uploadedFile}/>
            </label>
           </div>
           <img src={currentUser.profilePic}  style={{width:'100%', height:'50%'}}   ref={image}/>

           <div className="p-1" style={{display:'flex', flexDirection:"row", justifyContent:'space-between'}}>
           <div onClick={props.onHide} className="modal-btn">Cancel</div>
          <p  onClick={() =>{
               updatePicture()
               updateNameAndUsername()
               props.history.push(`/profile/${username}`)
               props.onHide()
          }}className="modal-btn" >Save</p>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
  
  export default EditProfileModal