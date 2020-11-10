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