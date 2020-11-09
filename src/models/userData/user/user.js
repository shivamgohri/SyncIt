/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 09-11-202020 55:37:23
 * @modify date 09-11-202020 55:37:23
 * @desc [description]
 */
const mongoose = require('mongoose')
const userSchema = require('./userSchema')

const User = mongoose.model('User', userSchema)

module.exports = User