const express = require('express')
const router = express.Router()
const upload = require('../services/file-upload')
const multer = require('multer')
const auth = require('../Middleware/authenticate')
const { createNotification } = require('../services/utils')
const User  = require('../models/User')
const Discussion  = require('../models/Discussion')
const Message  = require('../models/Message')


router.post('/new-discussion',auth, async(req,res) => {
    var temp = req.body.body.indexOf('<img src="')
    let postBody,image
    if(temp != -1){
        image = req.body.body.slice(temp+10,req.body.body.lastIndexOf('"'))
        postBody = req.body.body.slice(0,req.body.body.indexOf('<figure'))
        if(!postBody){
            postBody = '<p></p>'
        }
    }else{
        image = ''
        postBody = req.body.body
    }
    User.findOne({_id: req.body.currentUserId})
    .exec((err, user) => {
        if(err) return handleError(err)
        const discussion = new Discussion({
            topic: postBody,
            creator: creator,
            likes:0,
            image:image,
            video:''
        }) 
        discussion.save()
    
        res.send(discussion)
    })
})
router.post('/upload-video-post', async (req,res) => {
    const  creator = await User.findOne({_id: req.body.currentUserId})
    User.findOne({_id: req.body.currentUserId}, (err,creator) => {
        if(err) return handleError(err)
        const newDiscussion = new Discussion({
            topic: req.body.title,
            creator: creator,
            likes:0,
            video:req.body.videoUrl,
            image:''
        })
        newDiscussion.save()
        res.send({success:true})
    })
})

router.post('/like/:discussionId',auth, async (req,res) => {
    const discussion = await Discussion.findOne({_id: req.params.discussionId})
    const sender = await User.findOne({_id: req.body.currentUserId})
    const recipient  = await User.findOne({_id: discussion.creator})
    const MessageBody = `${sender.username} liked your post.` 
    const type = "like-discussion"
    const typeId = req.params.discussionId
    const parentId = sender._id
    createNotification(sender,recipient,MessageBody, type, typeId, parentId)   
    const likes = discussion.likes + 1
    discussion.likes = likes
    discussion.save()
   
    const discussions = await Discussion.find({})
                              .sort({$natural: -1})
                              .populate('creator')
                              .populate({path: 'messages', populate: {path: 'sender'}})
    res.send({discussions})
})

router.get('/discussions',   async (req,res) => {
    const discussions = await Discussion.find({})
                              .sort({$natural: -1})
                              .populate('creator')
                              .populate({path: 'messages', populate: {path: 'sender'}})
    res.send({discussions})
})
router.get('/watch-videos',auth, async (req,res) => {
    const discussions = await Discussion.find({video: {$gt: 0}})
                                        .sort({$natural: -1})
                                        .populate('creator')
                                        .populate({path: 'messages', populate: {path: 'sender'}})
    res.send(discussions)
})

router.get('/discussions/:discussionId',auth, async (req,res) => {
    const discussion = await Discussion.findOne({_id: req.params.discussionId})
                                .populate({path: 'messages', populate: {path: 'sender'}})
                                .populate('creator')
    res.send({discussion})
})
router.get('/comment-replies/:commentId', auth, async (req,res) => {
    const message  = await Message.findOne({_id: req.params.commentId})
                                  .populate({path:'replies', populate: {path: 'sender'}})
    res.send(message.replies)
})
const postImageUpload = upload.single('upload')

router.post('/auploads',auth, (req,res) => {
    
   postImageUpload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
        console.log(err)
    } else if (err) {          
        console.log(err)
    }
    res.status(200).json({
        uploaded: true,
        url: `${req.file.location}`
    })
  })
})

  router.post('/upload-video',auth, (req,res) => {
    singleUpload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            console.log(err)
        } else if (err) {          
            console.log(err)
        }
        res.status(200).json({
            uploaded: true,
            url: `${req.file.location}`
        })
      
  })
})


module.exports = router