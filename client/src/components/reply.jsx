import React, { useState } from 'react'
import { Media } from 'react-bootstrap'
import ReactHtmlParser from 'react-html-parser'
import { Link } from 'react-router-dom';


const Reply = ({reply}) => {

   const [replyBool,setReplyBool] = useState(false)
   
   return (
      <div style={styles.container}>
          <div style={styles.comment}>
            <Media className="p-1">
                <p className="" style={{width:'30px', height:'30px'}}>
                    <Link to={`/profile/${reply.sender.username}`}>
                       <img src={reply.sender.profilePic} className="h-100 w-100 rounded-circle"/>                        
                    </Link>
                </p>
                <Media.Body className="ml-2"  >
                  <div style={styles.body}>
                       <Link to={`/profile/${reply.sender.username}`}>
                          <h6 style={{color:'#EBC944'}} className=" font-weight-bold ">{reply.sender.name}</h6>
                       </Link>
                        <p style={{fontFamily:'Open Sans Condensed, sans-serif'}} className="w-100 text-break">
                           {ReactHtmlParser(reply.message)}
                        </p>
                  </div>
                  {/* <div style={styles.foot}>

                     <div
                          style={styles.icon}
                     >
                          <i class="far fa-thumbs-up mr-3"> Like </i> 
                     </div>
                     <div 
                          style={styles.icon}
                          onClick={() => {
                             setReplyBool(true)
                          }}
                     >
                        <i class="fa fa-reply mr-3 d" > Reply </i>
                     </div>     
                  </div> */}
                </Media.Body>
                
            </Media>            
            <div>
               {/* {
                  replyBool ? 
                        <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'row'}} >
                           <p className="" style={{width:'30px', height:'30px'}}>
                              <img src={props.sender.profilePic} className="h-100 w-100 rounded-circle"/>                        
                           </p>
                           <input value={replyValue} onChange={handleChange} type="text" placeholder="Add a reply..." style={{borderRadius:'10px'}} className=" ml-3 w-100 pl-2" />
                        </form>
                     : null
               } */}
            </div> 
         </div> 

      </div>
   )

}
const  styles = {
   container: {
     marginBottom:'5px',
     width:'100%'
   },
   comment: {
       
   },
   body: {
       backgroundColor:'#E1E8ED',
       borderRadius: '10px',
       padding: '0px 0px 0px 10px'
   },
   foot: {
       display:'flex',
       flexDirection:'row',
       justifycontent:'space-between',       
   },
   icon: {
      cursor:'pointer'

   },
}


export default Reply