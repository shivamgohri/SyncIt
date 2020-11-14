/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 09-11-202020 47:37:23
 * @modify date 09-11-202020 47:37:23
 * @desc [description]
 */
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const teacherSchema = require('./teacherSchema')

teacherSchema.pre('save', async function(next) {
    const teacher = this

    if (teacher.isModified('password')) {
        teacher.password = teacher.getHashedPassword(teacher.password)
    }
    next()
})

teacherSchema.methods.getHashedPassword = async function(password) {
    const newPassword = await bcrypt.hash(password, 8)
    return newPassword
}

teacherSchema.methods.getFullName = function() {
    return this.firstName + ' ' + this.lastName
}

teacherSchema.methods.generateAuthToken = function(req) {
    const teacher = this
    const token = jwt.sign({
        _id: teacher._id.toString()
    }, process.env.JWT_SECRET_KEY, {
        expiresIn: 6 * 31 * 24 * 60 * 60
    })

    const tokenObject = { token }

    if (req.headers['user-agent'])
        tokenObject.host = req.headers['user-agent']
    else
        tokenObject.host = 'Undefined'

    if (req.connection.remoteAddress) 
        tokenObject.remoteAddress = req.connection.remoteAddress
    else
        tokenObject.remoteAddress = 'Undefined'

    teacher.tokens = teacher.tokens.concat(tokenObject)
    return token
}

teacherSchema.methods.getPersonalProfile = function() {
    const teacher = this
    const teacherPersonalProfile = teacher.toObject()

    delete teacherPersonalProfile.password
    delete teacherPersonalProfile.avatar

    if (teacher.avatar) {
        teacherPersonalProfile.avatarUrl = teacher.getAvatarUrl()
    }
    teacherPersonalProfile.fullName = teacher.getFullName()
    return teacherPersonalProfile
}

teacherSchema.methods.getAvatarUrl = function() {
    return process.env.API_URL + '/teacher/' + this._id + '/avatar'
}