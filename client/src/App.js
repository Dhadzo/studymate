import React, {useEffect,useState} from 'react';
import Header from './components/header.component';
import WelcomePage from './pages/welcomepage/welcomepage.component';
import SignIn from './pages/signin.component';
import SignUp from './pages/signup.component';
import ChatsPage from './pages/chats-page';
import Notifications from './pages/notifications';
import Profile from './pages/profile';
import HomePage from './pages/homepage';
import Discussion from './pages/discussion';
import ScrollToTop from './components/scroll-to-top';
import Footer from './components/footer.component';
import { useSelector, useDispatch } from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';
import { addAllDiscussions, addDiscussionsUsers, addDiscussionsCreators } from './redux/posts/posts-actions'
import NewPost from './pages/new-post';
import Trending from './pages/watch-videos';
import Search from './pages/search';
import WatchVideos from './pages/watch-videos';
import './App.scss'


const App = () => {

  const  currentUser = useSelector(state => state.user.currentUser)
  const temp = useSelector(state => state.posts.discussions)
  const dispatch =  useDispatch()
  return (
    <div style={{display:'flex',  flexDirection:'column', justifyContent:'space-bet'}}>
      <Header/>
        <div className="mainBody">
          <Switch>
            <Route exact path={'/'} render={() => currentUser ? (<Redirect to='/home' />) : ( <WelcomePage/>)}/>
            <Route exact path={'/signin'} render={() => currentUser ? (<Redirect to='/home' />) : ( <SignIn/>)} />
            <Route exact path={'/signup'} render={() => currentUser ? (<Redirect to='/home' />) : ( <SignUp/>)}/>
            
            {
              currentUser ?
                <Switch>
                  <Route path={'/home'} render = {(props) => <HomePage {...props} />} />
                  <Route path={'/discussions/:discussionId'} render = {(props) => <Discussion currentUser={currentUser} {...props}/>} />
                  <Route path={'/chats'} component={ChatsPage} />
                  <Route path={'/notifications'} component={Notifications} />
                  <Route path={'/profile/:username'} component={Profile} />
                  <Route path={'/new-post'} component={NewPost} />
                  <Route path={'/watch'} component={WatchVideos} />
                  <Route path={'/search'} component={Search} />

                </Switch>
                : <Redirect to='/signin' />
            }
          </Switch>
      </div>
     </div>
     
  );
}
export default App;