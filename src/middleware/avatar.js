/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 11-11-202020 41:35:16
 * @modify date 11-11-202020 41:35:16
 * @desc [description]
 */
const multer = require('multer')

const userAvatar = multer({
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})

const teacherAvatar = multer({
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})

module.exports = {
    userAvatar,
    teacherAvatar
}