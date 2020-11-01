import React, { useState, useRef, useEffect } from 'react'
import VideoDropZone from '../components/video-dropzone'
import PostUpload from '../components/post-upload'
import { useSelector } from 'react-redux'

const NewPost = ({history}) => {
    const [inputValue,setInputValue] = useState('')
    const currentUser = useSelector(state => state.user.currentUser)
    const userToken = useSelector(state => state.user.userToken)
    const currentUserId = currentUser._id
    const submit = useRef(null)
    const [post,setPost] = useState(true)
    const [imageAndVideo,setImageAndVideo] = useState(false)


    const handleSubmit = (editor) => {
        submit.current.addEventListener('submit',  event => {
            event.preventDefault()
            const body = editor.getData()
            const title = inputValue
            editor.setData('')
            fetch('/api/new-discussion', {
              headers:{
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'auth-token': `${userToken}`

              },
              method:'POST',
              body: JSON.stringify({
                body,currentUserId
              })
             }).then(response => response.json())
              .then(data => {
                    history.push('/home')
              })
        })
   }
  const  handleChange = event => {
     setInputValue(event.target.value)
  }
  useEffect(() => {
      window.scrollTo(0,0)
  },[])
    return (
            <div style={styles.container}>

               <div style={styles.postDiv}>
                  <div style={styles.tabs}
                  >
                      <div style={styles.tabItem}
                      className={`${post ? 'text-primary':'text-black-50' } border border-black border-left-0 border-top-0`}

                        
                      onClick={() =>{
                          setPost(true)
                          setImageAndVideo(false)
                      }}>
                         <i class="fas fa-edit"> Post </i>
                      </div>
                      <div style={styles.tabItem}
                          className={`${imageAndVideo ? 'text-primary': 'text-black-50'} border border-black border-left-0 border-top-0`}
                          
                             onClick={() =>{
                                setPost(false)
                                setImageAndVideo(true)
                             }}
                      >
                          <i class="fas fa-images">  Images and Video </i>
                        
                      </div>
                      <div style={styles.tabItem}
                         className="text-black-50 border border-black border-left-0 border-top-0"
                      >
                      <i class="fas fa-link"> Link </i>
                      </div>
                      <div style={styles.tabItem}
                         className="  text-black-50 border border-black border-left-0 border-right-0 border-top-0"
                      >
                        <i class="fas fa-images">  Poll </i>
                      </div>
                  </div>                   
                      {
                          imageAndVideo?
                            <VideoDropZone history={history} />
                          :null
                      }
                                        
                      {
                           post?
                              <PostUpload history={history} />      
                           :null
                      }
                    
               </div>
            </div>
    )
}
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop:'100px'
        
    },
    postDiv:{
        display:'flex',
        flexDirection:'column',
        backgroundColor:'white',
        height:'500px',
        width:'800px',
        alignItems:'center',
        backgroundImage: `url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat-back.svg')`,
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
        backgroundSize: '10%'
        
    },
    tabs: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'white',
        backgroundImage: `url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat-back.svg')`,
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
        backgroundSize: '10%'
    },
    tabItem: {
        padding:'10px',
        width:'200px',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center'

    },
    title:{
        border:'1px solid black',
        alignItems:'center',
        width:'750px',
        margin:'15px',
        borderRadius:'5px',
        padding:'10px'
    },
    buttons: {
        display:'flex',
        //justifyContent:'end'
        justifyContent:'flex-end',
        width:'750px'
    }
}

export default NewPost