const multer = require('multer')

const uploadAvatar = multer({
    limits: {
        fileSize: 1000000 // 1mb
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload a jpg,jpeg,png file!'))
        }

        cb(undefined, true)
    }
})

module.exports = uploadAvatar