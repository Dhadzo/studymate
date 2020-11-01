const express = require('express')
const router = express.Router()
const upload = require('../services/file-upload')
const multer = require('multer')
const jwt = require('jsonwebtoken')
const validation = require('../Middleware/validation')
const bcrypt = require('bcryptjs')
const auth = require('../Middleware/authenticate')
const User = require('../models/User')
const Discussion  = require('../models/Discussion')

router.post('/signup', async (req,res) => {
    const {error} = validation.signupValidation(req.body)
    if(error)return res.status(400).json(error)
    const duplicatEmail = await User.findOne({email: req.body.email})
    if(duplicatEmail) return res.status(400).json({error:'This email address is in use by another account.'})
    const duplicateName = await User.findOne({name: req.body.name})
    if(duplicateName)return res.status(400).json({error:'This name is in use by another account.'})
    const duplicateUsername = await User.findOne({username: req.body.username})
    if(duplicateUsername)return res.status(400).json({error: 'This username is in use by another account'})
    const hashedPassword = await validation.encryptPassword(req.body.password)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
        profilePic:'https://studymate-profile-pics.s3.eu-west-2.amazonaws.com/EBC944.jpg'
    })
    try {
        const savedUser = await user.save()
        const token = jwt.sign({_id: savedUser._id, name: savedUser.name}, process.env.TOKEN_SECRET)
        console.log('account successfully created')
        res.json({user: savedUser, authToken: token})
    } catch (error) {
        console.log('error creating user')
        res.status(400).send(error)
    }
})
router.post('/signin', async (req,res) => {
    const {error} = validation.signinValidation(req.body)
    if(error)return res.status(400).json({message:error})
    const user = await User.findOne().or([{email: req.body.emailOrUsername}, {username: req.body.emailOrUsername}])
 
    if(!(user)) return res.status(400).json({message: 'Email or username not found.'})

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword)return res.status(400).json({message:'Incorrect Password'})
   
    const token = jwt.sign({_id: user._id,name:user.name}, process.env.TOKEN_SECRET)
    res.json({user:user,authToken:token})
    console.log('user logged in')
})




router.get('/search-users/:value', auth, async (req,res) => {
    const regex = new RegExp(req.params.value, 'i')
    const  users = await User.find({$or:[{username: {$regex: regex}}, {name: {$regex: regex}}]}, 'name profilePic')

    res.send(users)
})

router.get('/search/users/:query',auth, async(req,res) => {
    const regex = new RegExp(req.params.query, 'i')
    const  users = await User.find({$or:[{username: {$regex: regex}}, {name: {$regex: regex}}]}, 'username name profilePic')
    res.send(users)
})
router.get('/profile/:username',auth, async (req,res) => {    
    const user =  await User.findOne({username: req.params.username})
    const userPosts = await Discussion.find({creator: user})
                                      .populate({path: 'messages', populate: {path: 'sender'}, populate: {path:'replies'}})
                                      .populate('creator')
    res.send({user,userPosts})
})
router.get('/refresh-user/:userId',auth, async (req,res) => {
    const user = await User.findOne({_id: req.params.userId})
    console.log(user)
    res.send(user)
})
router.post('/edit-profile',auth, async (req,res) => {
    const user = await User.findOne({_id: req.body.currentUserId})
    user.name = req.body.name
    user.username = req.body.username
    user.save()
    res.send(user)
})
const singleUpload = upload.single('file')

router.post('/change-profile-pic/:userId',auth, (req,res) => {
   singleUpload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            console.log(err)
        } else if (err) {          
            console.log(err)
        }
        let user = await User.findOne({_id: req.params.userId})
        user.profilePic = req.file.location
        user.save()
        return res.json(user)
    })
})
router.get('/who-to-follow',auth, async (req,res) => {
    User.find({}, 'profilePic username').limit(4).exec((err, users) => {
        res.send(users)
    })

})

module.exports = router