import React,{useState} from 'react';
import { signInSuccess, signInToken } from '../redux/user/user.actions';
import { useDispatch } from 'react-redux'
import './signin.styles.scss'
import Spinner from 'react-bootstrap/Spinner'

const SignIn = () => {
  
    const [userCredentials, setUserCredentials] = useState({emailOrUsername:'',password:'' })
    const [isLoading,setIsLoading] = useState(false)
    const [errorSigningIn,setErrorSigningIn] = useState('')
    const dispatch = useDispatch()

    const {emailOrUsername,password} = userCredentials

    const handleChange = async event => {
        const {name,value} = event.target
        setUserCredentials({...userCredentials, [name]: value})
    }

    const handleSubmit = async event => {
        setIsLoading(true)
        setErrorSigningIn('')
        event.preventDefault()
        fetch('/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(userCredentials)
        })
        .then(response => response.json())
        .then(data => {
            if(data.message){
                if(!!data.message.details){
                    setErrorSigningIn(data.message.details[0].message)
                    console.log(data.message.details[0].message)
                }else{
                    setErrorSigningIn(data.message)
                    console.log(data.message)
                }
                setIsLoading(false)
            }else{
                dispatch(signInSuccess(data.user))
                dispatch(signInToken(data.authToken))
                setUserCredentials({emailOrUsername:'',password:'' })
            }
        })
        
    }
    return (
        
        
        <div style={{opacity: `${isLoading ? '0.4' : '1'}`}}>
               {
                    isLoading ? 
                    <div className=" position-absolute" style={{marginLeft:'673px',marginTop:'200px'}}>
                    <Spinner animation="border" variant="white" />
                    </div>
                    : null
                }
         
            <div class="login-wrap">
                <div class="login-html">
                    <input id="tab-1" type="radio" name="tab" class="sign-in" checked /><label for="tab-1" class="tab" style={{fontFamily:'Grenze Gotisch, cursive'}}>Sign In</label>
                    <form class="login-form" onSubmit={handleSubmit}>
                        <div class="sign-in-htm">
                            <div class="group">
                                <input type="text" placeholder="Email or username"  className={`${errorSigningIn ? 'border-danger': 'border-dark'} input`} name="emailOrUsername" value={emailOrUsername} onChange={handleChange} />
                            </div>
                            <div class="group">
                                <input type="password" placeholder="Password"  className={`${errorSigningIn ? 'border-danger': 'border-dark'} input`} name="password" value={password} onChange={handleChange} data-type="password" />
                                <small className={`${errorSigningIn.length>0 ? 'text-danger ml-1': 'd-none'}`}>{errorSigningIn}</small>
                            
                            </div>
                            <div class="group">
                                <input id="check" type="checkbox" class="check" checked />
                                <label for="check" style={{fontFamily:'Grenze Gotisch, cursive'}}><span class="icon"></span> Keep me Signed in</label>
                            </div>
                            <div class="group">
                                <input type="submit" class="button" value="Sign In" />
                            </div>
                            <div class="hr"></div>
                            <div class="foot-lnk">
                                <a href="#" style={{color:'#A11919'}}>Forgot Password?</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
       </div>
    );
}
export default SignIn;