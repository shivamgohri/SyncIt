/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 09-11-202020 02:38:23
 * @modify date 09-11-202020 02:38:23
 * @desc [description]
 */
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userSchema = require('./userSchema')

userSchema.pre('save', async function(next) {
    const user = this

    if (user.isModified('password')) {
        user.password = user.getHashedPassword(user.password)
    }
    next()
})

userSchema.methods.generateAuthToken = function(req) {
    const user = this
    const token = jwt.sign({
        _id: user._id.toString(),
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

    user.tokens = user.tokens.concat(tokenObject)
    return token
}

userSchema.methods.getFullName = function() {
    return this.firstName + ' ' + this.lastName
}

userSchema.methods.getPersonalProfile = function() {
    const user = this
    const userPersonalProfile = user.toObject()

    delete userPersonalProfile.password
    delete userPersonalProfile.avatar

    if (user.avatar) {
        userPersonalProfile.avatarUrl = user.getAvatarUrl()
    }

    userPersonalProfile.fullName = user.getFullName()
    return userPersonalProfile
}

userSchema.methods.getHashedPassword = async function(password) {
    const newPassword = await bcrypt.hash(password, 8)
    return newPassword
}

userSchema.methods.getAvatarUrl = function() {
    return process.env.API_URL + '/user/' + this._id + '/avatar'
}