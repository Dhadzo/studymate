import {combineReducers} from 'redux';
import userReducer from './user/user.reducer';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import postsReducer from './posts/posts-reducers';

const persistConfig = {
    key:'root',
    storage,
    whitelist: ['user']
}
const rootReducer = combineReducers({
    user: userReducer,
    posts: postsReducer
});

export default persistReducer(persistConfig,rootReducer);





