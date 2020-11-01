import React, { useState, useRef, useEffect } from 'react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import CKEditor from '@ckeditor/ckeditor5-react'
import { useSelector } from 'react-redux'

const PostUpload = ({history}) => {
    const currentUser = useSelector(state => state.user.currentUser)
    const userToken = useSelector(state => state.user.userToken)
    const currentUserId = currentUser._id
    const submit = useRef(null)


    const handleSubmit = (editor) => {
        submit.current.addEventListener('submit',  event => {
            event.preventDefault()
            const body = editor.getData()
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
  useEffect(() => {
      window.scrollTo(0,0)
  },[])

  return (
      <div style={styles.container}>
           <form style={styles.postDiv}  ref={submit}>
                                        
               <div className="mt-3">
                <CKEditor
                    editor={ClassicEditor}
                    onInit={editor => {
                    handleSubmit( editor )
                    editor.editing.view.change(writer => {
                        writer.setStyle(
                            "height",
                            "250px",
                            editor.editing.view.document.getRoot()
                        );
                        writer.setStyle(
                            "width",
                            "750px",
                            editor.editing.view.document.getRoot()
                        );
                        });
                    }}
                    config={ {
                        ckfinder: {
                            uploadUrl:'/api/uploads'
                        },
                        title: {
                            placeholder: 'My custom placeholder for the title'
                        },
                        image: {
                            toolbar: [  'imageStyle:side', '|', 'imageTextAlternative' ],
                            styles: [
                                'alignRight'
                            ],
                            resizeOptions: 
                                {
                                    name: 'imageResize:50',
                                    label: '50%',
                                    value: '50'
                                }
                        }
                    } }
                />       
                </div>
                <div style={styles.buttons}>
                    <p className="pl-4 btn pr-4 m-1 pt-1 pb-1 border-primary font-weight-bold bg-white text-primary" style={{fontSize:'15px',borderRadius:'5px'}} >Cancel</p>
                    <button className="pl-4 pr-4 m-1 pt-1 pb-1 bg-primary font-weight-bold text-white" style={{fontSize:'15px',border:'none',borderRadius:'5px'}} >Post</button>
                </div>
            </form>
        </div>
    )
}
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    postDiv:{
        display:'flex',
        flexDirection:'column',
        backgroundColor:'white',
        height:'500px',
        width:'800px',
        alignItems:'center'
    },
    tabs: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
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
        justifyContent:'flex-end',
        width:'750px'
    }
}

export default PostUpload