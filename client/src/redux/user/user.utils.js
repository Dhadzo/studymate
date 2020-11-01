import io from 'socket.io-client';

const ENDPOINT = '/'
let socket =   io(ENDPOINT)

export const sendMsg = (Messages,object) => {
    const {message,chatId,mateId,currentUserId} = object;
    socket.emit('message', {message,chatId,mateId,currentUserId})
}

export const sendDiscussionMsg = (Messages, object) => {
    const {message, discussionId, currentUserId} = object
    socket.emit('discussion-message', {message,discussionId,currentUserId})
}

export const sendReply = (replyObject) => {
    const {reply,messageId, senderId} = replyObject
    socket.emit('reply', {reply,messageId, senderId})
}

