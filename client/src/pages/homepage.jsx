import React, { useEffect } from 'react'
import RecentPosts from '../components/recent-posts';
import HotPosts from '../components/hot-posts';
import TrendingPosts from '../components/trending-posts'
import AllPosts from '../components/all-posts';
import WhoToFollow from '../components/who-to-follow';
import { useSelector, useDispatch } from 'react-redux'
import { addAllDiscussions } from '../redux/posts/posts-actions'
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import './homepage.scss'


const HomePage = ({match})  => { 
  
    const dispatch = useDispatch()
    const userToken = useSelector(state => state.user.userToken)

    useEffect(() => {
        fetch('/api/discussions',{    
            headers: {
                'auth-token': `${userToken}`
            }
        })
        .then(response => response.json())
        .then(data => {
            dispatch(addAllDiscussions(data.discussions))
        })
        window.scrollTo(0,0)
    },[])


    return (        
        <div className="container" >
            <div className="posts">
            <div className="displayedPostsOption">
               <Link to={'/home/trending-posts'} className="option text-decoration-none"> 
                    <i class="fas fa-chart-line text-warning"> 
                    </i>
                    <span className="text">Trending</span>
               </Link>
               <Link to={'/home/hot-posts'} className="option text-decoration-none">
                    <i class="fab fa-hotjar text-success">
                    </i>   
                    <span className="text">Hot</span>  
                </Link> 
               
                <Link to={'/home/recent-posts'} className="option text-decoration-none">
                    <i class="fab fa-hotjar text-info"></i>  
                    <span className="text">Recent</span>  
                </Link> 
                
                <Link to={'/watch'} className="option text-decoration-none">
                    <i class="fab fa-youtube text-danger"></i>
                    <span className="text">Videos</span>  
                </Link> 
                <Link to={'/new-post'} className="option text-decoration-none"> 
                    <i class="fas fa-edit text-primary">
                    </i>
                    <span className="text">Create</span> 
                </Link>
            </div>
            <Switch>
                <Route  path={`${match.path}/trending-posts`} component={TrendingPosts} />
                <Route path={`${match.path}/hot-posts`} component={HotPosts} />
                <Route path={`${match.path}/recent-posts`} component={RecentPosts} />
                <Route path={`${match.path}`} component={AllPosts} />

            </Switch>
         </div>
         <div className="who-to-follow ">
            <WhoToFollow />
         </div>  

       </div> 
 
    )
}

export default HomePage