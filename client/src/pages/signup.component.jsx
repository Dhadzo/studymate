import React, {useState} from 'react';
import { useEffect } from 'react';
import './signin.styles.scss'
import { useDispatch} from 'react-redux'
import { signInSuccess, signInToken } from '../redux/user/user.actions';
import './signin.styles.scss'
import Spinner from 'react-bootstrap/Spinner'



const SignUp  = () => {

    const [userCredentials, setUserCredentials] = 
    useState({name:'',email:'',username:'',password:'' })
    const [isLoading,setIsLoading] = useState(false)
    const [errorSigningIn,setErrorSigningIn] = useState('')
    const [emailError,setEmailError]=useState('')
    const [nameError,setNameError]=useState('')
    const [passwordError,setPasswordError]=useState('')
    const [usernameError,setUsernameError] = useState('')
    const [result,setResult] = useState('')
    const dispatch = useDispatch()

    const {name,email,username,password} = userCredentials

    const handleChange = async event => {
        const {name,value} = event.target
        setUserCredentials({...userCredentials, [name]: value})
    }
    const handleSubmit = async event => {
        event.preventDefault()
        setEmailError('')
        setNameError('')
        setPasswordError('')
        setUsernameError('')
        setResult('')
        setIsLoading(true)

        fetch('/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(userCredentials)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.details){
                const temp = data.details[0].message
                if(temp.includes('email')){
                    setEmailError(temp)
                }else if(temp.includes('name')){
                    if(temp.includes('username')){
                        setUsernameError(temp)
                    }else{
                        setNameError(temp)
                    }
                }else if(temp.includes('password')){
                    setPasswordError(temp)
                }
            }else if(data.error){
                const temp = data.error
                if(temp.includes('name')){
                    setNameError(temp)
                }else if(temp.includes('email')){
                    setEmailError(temp)
                }
            }else{
                dispatch(signInSuccess(data.user))
                dispatch(signInToken(data.authToken))
                setUserCredentials({name:'',email:'',username:'',password:'' })
            }
           setIsLoading(false)
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
                    <input id="tab-2" type="radio" name="tab" class="sign-up" checked/><label for="tab-2" style={{fontFamily:'Grenze Gotisch, cursive'}} class="tab">Sign Up</label>
                    <form class="login-form" onSubmit={handleSubmit}>
                        <div class="sign-up-htm">
                            <div class="group">
                                <input id="name" placeholder="Name" name="name" value={name} onChange={handleChange}  type="text" className={`${nameError.length>0 ? 'border-danger': 'border-dark'} input`} />
                                <small className={`${nameError.length>0 ? 'text-danger ml-2': 'd-none' }`}>{nameError}</small>
                            </div>
                            <div class="group">
                                <input id="pass" placeholder="Email" type="email" name="email" value={email} onChange={handleChange} className={`${emailError.length>0 ? 'border-danger': 'border-dark'} input`}  />
                                <small className={`${emailError.length>0 ? 'text-danger ml-2' : 'd-none'}`}>{emailError}</small>
                            </div>
                            <div class="group">
                                <input id="pass" placeholder="Password" type="password" className={`${passwordError.length>0 ? 'border-danger': 'border-dark'} input`}  name="password" value={password} onChange={handleChange} data-type="password"/>
                                <small className={`${passwordError.length>0 ? 'text-danger': 'd-none'}`}>{passwordError}</small>
                            </div>
                            <div class="group">
                                <input id="pass" type="text" placeholder="Username" name="username" value={username} onChange={handleChange} className={`${usernameError.length>0 ? 'border-danger': 'border-dark'} input`} />
                                <small className={`${usernameError.length>0 ? 'text-danger' : 'd-none'}`}>{usernameError}</small>
                            </div>
                            <div class="group">
                                <input type="submit" class="button" value="Sign Up" />
                            </div>
                        </div>
                    </form>
                </div>
            </div> 
        </div>
    );
}

export default SignUp;