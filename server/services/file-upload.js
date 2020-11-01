const multerS3= require('multer-s3')
const multer = require('multer')
const aws = require('aws-sdk')

aws.config.update({
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    accessKeyId: process.env.ACCESS_KEY_ID,
    region: process.env.REGION
})
var s3 = new aws.S3()

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'studymate-profile-pics',
        acl: 'public-read',
        metadata: (req,file,cb) => {
            cb(null, {fieldName: "TEsting metadata"})
        },
        key: async (req,file,cb) => {
            const date =  Date.now().toString() 
            cb(null, date)
        }
    })
})

module.exports = upload