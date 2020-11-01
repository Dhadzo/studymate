import UserActionTypes from './user.types';
import {sendMsg, sendDiscussionMsg,sendReply, refreshCurrentUser} from './user.utils';
import io from 'socket.io-client';
import { stat } from 'fs';

const INITIAL_STATE = {
    currentUser: null,
    userToken: '',
    Messages: null,
    error: null,
    isFetchingMates: false,
    searchResultMates: null,
    mates: null,
    isSending: true,
    isSendDiscussionMsg: true,
    isSendingReply:true,
    likingPost:false,
    Replies: [],
    userProfile:null,
    userHeaderOptionsDisplay:false
}

const userReducer  = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case UserActionTypes.SIGN_IN_TOKEN:
            return {
                ...state,
                userToken: action.payload
            }
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null
            }
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                userToken: '',
                error: null
            }
        case UserActionTypes.UPDATE_USER_PROFILE:
            return {
                ...state,
                currentUser: action.payload
            }
        case UserActionTypes.SEND_DISCUSSION_MESSAGE:
            return {
                ...state,
                Messages: sendDiscussionMsg(state.Messages, action.payload)
            }
        case UserActionTypes.SEND_MESSAGE_START:
            return {
                ...state,
                Messages: sendMsg(state.Messages,action.payload)
            }
        case UserActionTypes.SENDING_MESSAGE_STATUS:
            return {
                ...state,
                isSending: !state.isSending
            }
        case UserActionTypes.SENDING_DISCUSSION_MESSAGE_STATUS:
            return {
                ...state,
                isSendDiscussionMsg: !state.isSendDiscussionMsg
            }
        case UserActionTypes.SEND_REPLY:
            return {
                ...state,
                Replies: sendReply(action.payload)
            }
        case UserActionTypes.SENDING_REPLY_STATUS:
            return {
                ...state,
                isSendingReply: !state.isSendingReply
            }
        case UserActionTypes.LIKING_POST:
            return {
                ...state,
                likingPost: !state.likingPost
            }
        case UserActionTypes.FETCH_MATES_SUCCESS:
            return {
                ...state,
                searchResultMates: action.payload,
                isFetchingMates: false
            }
        case UserActionTypes.FETCH_USER_PROFILE:
            return {
                ...state,
                userProfile: action.payload
            }
        case UserActionTypes.TOGGLE_USER_HEADER_OPTIONS_DISPLAY:
            return {
                ...state,
                userHeaderOptionsDisplay: action.payload
            }
        default:
            return state;
            
    }
}
export default userReducer;