import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import {useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom'
import './autocomplete-input.styles.scss'

const AutocompleteInput = ({subjects, ...otherProps }) => {

    const userToken = useSelector(state => state.user.userToken)
    const [activeItem,setActiveItem] = useState(-1)
    const [filteredUsers,setFilteredUsers] = useState([])
    const [value,setValue] = useState('')
    const [inputValue,setInputValue] = useState('')
    const searchFieldInput = useRef(null)
    const subjectSearchResultBox = useRef(null)
    const history = useHistory()

    const handleKeyPress = async event => {
        if(event.key.length===1){
            setInputValue(event.target.value)
        }
    }
    const handleKeyDownUp = async event => {
        if(event.target.value === ''){
            setActiveItem(-1)
            setInputValue('')
        }
        if(event.keyCode === 40){
            handleKeyDown()
        }else if(event.keyCode === 38){
            handleKeyUp()
        }else if(event.keyCode === 13){
            history.push({pathname:'/search', search:`?q=${value}`})
            setValue('')
            setInputValue('')
        }
    }
    const handleKeyUp = () => {
        if(subjectSearchResultBox.current){
            const children = subjectSearchResultBox.current.children
            var i
            for(i=0; i< children.length; i++){
                children[i].style.backgroundColor = ''
            }
            if(activeItem === -1){
                setActiveItem(children.length-1)
                const temp = children.length-1
                subjectSearchResultBox.current.children[temp].style.backgroundColor = 'grey'
                setValue(subjectSearchResultBox.current.children[temp].children[1].innerHTML)
            }else{
                setActiveItem(activeItem-1)
                const temp = activeItem-1
                if(temp === -1){
                    setValue(inputValue)
                }else{
                    subjectSearchResultBox.current.children[temp].style.backgroundColor = 'grey'
                    setValue(subjectSearchResultBox.current.children[temp].children[1].innerHTML)
                }
            }
       }
    }
    const handleKeyDown = () =>{
        if(subjectSearchResultBox.current){
            const children = subjectSearchResultBox.current.children
            var i
            for(i=0; i< children.length; i++){
                children[i].style.backgroundColor = ''
            }
            if(activeItem === children.length-1){
                setValue(inputValue)
                setActiveItem(-1)
            }else{
                const temp = activeItem+1
                setActiveItem(activeItem+1)
                subjectSearchResultBox.current.children[temp].style.backgroundColor = 'grey'
                setValue(subjectSearchResultBox.current.children[temp].children[1].innerHTML)
            }
        }
    }
    useEffect(() => {
        fetch(`/api/search-users/${value.toLowerCase()}`,{
            headers: {
                'auth-token': `${userToken}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setFilteredUsers(data)
        })
    },[inputValue])

    const handleChange = async event =>{
        setValue(event.target.value)
        setInputValue(event.target.value)
    }
    return (
        <div >
               <div class="input-group">
                    <div class="input-group-prepend">
                        <div class="input-group-text border-right-0 searchbar" ><i class="fa fa-search"></i></div>
                    </div>
                    <input 
                            class="form-control pl-0 border-left-0 searchbar" 
                            type="search" 
                            placeholder="Search"
                            value={value}
                           onChange={handleChange}
                            onKeyPress={handleKeyPress}
                            {...otherProps}
                           onKeyDown={handleKeyDownUp} ref={searchFieldInput} autoComplete='off'
                            
                    />
                </div>
             {
                (inputValue.length !== 0 || inputValue !== '') && document.activeElement === searchFieldInput.current?
                ( filteredUsers.length !==0 ?
                <div className="rounded-0  mt-0 auto-div shadow" >
                    <ul className="p-3 list-unstyled text-white" ref={subjectSearchResultBox} >
                        {

                            filteredUsers.map(subject =>
                                <div style={{display:'flex', flexDirection:'row', alignItems:'center',marginBottom:'10px'}}>
                                    <img src={subject.profilePic} style={{width:'40px', height:'40px'}} />
                                    <li className="p-2">{subject.name}</li>
                                </div>
                            )
                        }
                    </ul>
                </div>
                : null)
                : null
            }
        </div>
    )
}
export default AutocompleteInput