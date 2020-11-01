import UserActionTypes from './user.types';



export const signInSuccess = (user) => ({
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user
});
export const signInToken = (userToken) => ({
    type: UserActionTypes.SIGN_IN_TOKEN,
    payload: userToken
})

export const checkUserSession = () => ({
    type: UserActionTypes.CHECK_USER_SESSION
})


export const signOutSuccess = () => ({
    type: UserActionTypes.SIGN_OUT_SUCCESS
});

export const updateUserProfile = data => ({
    type: UserActionTypes.UPDATE_USER_PROFILE,
    payload: data
})
export const sendMessageStart = messageChatAndCurrentUserId => ({
    type: UserActionTypes.SEND_MESSAGE_START,
    payload: messageChatAndCurrentUserId
})

export const sendingMessageStatus = () => ({
    type: UserActionTypes.SENDING_MESSAGE_STATUS
})

export const sendDiscussionMessage = messageDiscussionIdAndCurrentUserId => ({
    type: UserActionTypes.SEND_DISCUSSION_MESSAGE,
    payload: messageDiscussionIdAndCurrentUserId
})
export const sendingDiscussionMessageStatus = () => ({
    type: UserActionTypes.SENDING_DISCUSSION_MESSAGE_STATUS
})
export const sendReplyMessage = replyObject => ({
    type: UserActionTypes.SEND_REPLY,
    payload: replyObject
})
export const sendingReplyMessageStatus =  () => ({
    type: UserActionTypes.SENDING_REPLY_STATUS
})

export const refreshUser = () => ({
    type: UserActionTypes.REFRESH_USER
})

export const fetchUserProfile = (userProfile) => ({
   type: UserActionTypes.FETCH_USER_PROFILE,
   payload: userProfile
})  

export const toggleUserHeaderOptionsDisplay = (state) => ({
    type: UserActionTypes.TOGGLE_USER_HEADER_OPTIONS_DISPLAY,
    payload:state
})
export const userLikingPost = () => ({
    type: UserActionTypes.LIKING_POST
})