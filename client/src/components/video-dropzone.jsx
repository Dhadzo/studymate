import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import VideoPlayer from './video-player'

const VideoDropZone = ({history}) => {

  const currentUser = useSelector(state => state.user.currentUser)
  const currentUserId = currentUser._id
  const [title,setTitle] = useState('')
  const [videoUrl,setVideoUrl] = useState('')

  const handleChange = e => {
      setTitle(e.target.value)
  }
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        let formData = new FormData()
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append("file", file)
        axios.post('/api/upload-video', formData, config)
        .then(respose => {
            if(respose.data.uploaded){
               setVideoUrl(respose.data.url) 
               alert(respose.data.url)
            }else{
                alert('failed to upload video')
                console.log(respose) 
            }
        })
      }
      reader.readAsArrayBuffer(file)
    })
    
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

 const  handleSubmit = e => {
      e.preventDefault()
      const config = {
          header: {
               'Content-Type': 'application/json',
               'Accept': 'application/json'
            }
      }
      axios.post('/api/upload-video-post',{title:title,videoUrl:videoUrl,currentUserId:currentUserId}, config)
      .then(response => {
          if(response.data.success){
               history.push('/home')
          }else{
              alert('not working')
          }
      })

  }

  return (
     <form style={{display:'flex', flexDirection:'column', alignItems:'center'}} onSubmit={handleSubmit} >
        <input style={styles.title} value={title} onChange={handleChange} className=" border-black border"  name="title"  type="search" maxLength="300" placeholder="Title" />
        <div {...getRootProps()} style={{width:'150px', height:'30px', marginBottom:'5px'}} >
        <input {...getInputProps()} accept="video/*" />
            <p style={{borderRadius:'5px', width:'150px',height:'30px'}}
                  className=" text-center text-primary border border-primary bg-white">
                      {`${videoUrl.length>1 ? 'Delete video': 'Upload'}`}
           </p>
        </div>
        <div className=" border-black border" style={{height:'250px', width:'750px'}}>
            {
                videoUrl.length>1?
                <VideoPlayer src={videoUrl} width="750px" height="250px" top="80px" />
                // <video controls className=" w-100 h-100"> <source  src={videoUrl} /></video>
                :null
            }

        </div>
        <div style={styles.buttons}>
            <p className="pl-4 btn pr-4 m-1 pt-1 pb-1 border-primary font-weight-bold bg-white text-primary" style={{fontSize:'15px',borderRadius:'5px'}} >Cancel</p>
            <button className="pl-4 pr-4 m-1 pt-1 pb-1 bg-primary font-weight-bold text-white" style={{fontSize:'15px',border:'none',borderRadius:'5px'}} >Post</button>
         </div>
     </form>
  )
}
const styles = {
    title:{
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
export default VideoDropZone