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
        user.password = await bcrypt.hash(user.password, 8)
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

    user.tokens = user.tokens.concat({ token, host: req.headers['user-agent'] })

    return token
}

userSchema.methods.getFullName = function() {
    return this.firstName + ' ' + this.lastName
}

userSchema.methods.getPublicProfile = function() {
    const user = this
    const userPublicProfile = user.toObject()

    delete password
    delete tokens

    userPublicProfile.fullName = user.getFullName()
    return userPublicProfile
}