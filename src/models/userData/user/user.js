/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 09-11-202020 55:37:23
 * @modify date 09-11-202020 55:37:23
 * @desc [description]
 */
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = require('./userSchema')

// STATICS
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

const User = mongoose.model('User', userSchema)

module.exports = User