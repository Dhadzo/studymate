const socketio = require('socket.io');
const express = require('express');
const http = require('http');
const PORT = process.env.PORT || 5000
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const app = express();
const server = http.createServer(app);
const io =  socketio(server);
const cors = require('cors');
const utils = require('./services/utils')

dotenv.config()
if(process.env.NODE_ENV === 'production'){
    mongoose.connect(process.env.ATLAS_DB_CONNECT, {useNewUrlParser:true, useUnifiedTopology: true}, 
        () => console.log('Connected to database'))
}else{
    mongoose.connect(process.env.LOCAL_DB_CONNECT, {useNewUrlParser:true, useUnifiedTopology: true}, 
        () => console.log('Connected to database successfully'))
}

app.use(express.json());
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors())

if(process.env.NODE_ENV === 'production'){
   app.use('/', express.static('./public'));
}

app.use('/', require('./routes/users'))
app.use('/api/', require('./routes/users'))
app.use('/api/', require('./routes/chats'))
app.use('/api/', require('./routes/notifications'))
app.use('/api/', require('./routes/discussions'))
app.use('/api/', require('./routes/test'))

io.on('connect', (socket) => {
    console.log("We have a new connection")
    socket.on('message', (messageObject) => {
        const {message,chatId,mateId,currentUserId} = messageObject
        utils.addMessage(message,chatId,mateId,currentUserId)
        console.log('message sent')
        io.emit('sent-message')
    })   
    socket.on('discussion-message', messageObject => {
        const {message, discussionId,  currentUserId} = messageObject
        utils.addDiscussionMessage(message, discussionId,  currentUserId)
        console.log('message sent')
    }) 
    socket.on('reply', replyObject => {
        const {reply,messageId, senderId} = replyObject
        utils.addReply(reply,messageId, senderId)
        console.log('reply added')
        io.emit('reply-added')
    })
})

server.listen(PORT, () => console.log(`Server has started running on port ${PORT}`))