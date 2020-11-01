import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Media from 'react-bootstrap/Media';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const Search = () => {

    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const username = query.get('q')
    const [searchResults, setSearchResults] = useState([])
    const userToken = useSelector(state => state.user.userToken)

    useEffect(() => {
        fetch(`/api/search/users/${username}`,{
            headers:{
                'auth-token':`${userToken}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setSearchResults(data)
        })
    },[username])

    useEffect(() => {

    })

    return (
            <div style={styles.container}>
               {
                   searchResults.length > 0?
                      searchResults.map(result => (
                        <div style={styles.result}> 
                            <Link to={`/profile/${result.username}`} className="text-decoration-none text">
                                <Media className="" >
                                    <p className="rounded-circle  mr-3" style={{width:'60px', height:'60px'}}>
                                        <img src={result.profilePic} className="h-100 w-100 rounded-circle"/>                        
                                    </p>
                                    <Media.Body>
                                        <h5 className="  font-weight-normal text-break" style={{color:'black', fontSize:'15px', marginTop:'10px'}}>{result.name}</h5>
                                    </Media.Body>
                                </Media>
                            </Link>
                        </div>
                      ))
                   :<div className=" position-absolute" style={{marginLeft:'0px',marginTop:'200px'}}>
                        <Spinner animation="border" variant="white" />
                    </div>
               }
            </div>
    )
}

const styles = {
    container:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop:'100px',
        alignItems:'center'
    },
    result:{
        minHeight: '80px',
        backgroundColor:'white',
        marginBottom:'10px',
        maxWidth:'550px',
        minWidth:'550px',
        padding:'10px'
    }
}

export default Search