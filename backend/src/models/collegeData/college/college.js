/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 09-11-202020 54:36:23
 * @modify date 09-11-202020 54:36:23
 * @desc [description]
 */
const mongoose = require('mongoose')
const collegeSchema = require('./collegeSchema')

// STATICS

const College = mongoose.model('College', collegeSchema)

module.exports = College