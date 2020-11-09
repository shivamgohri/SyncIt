/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 09-11-202020 42:37:23
 * @modify date 09-11-202020 42:37:23
 * @desc [description]
 */
const mongoose = require('mongoose')
const teacherSchema = require('./teacherSchema')

// STATICS

const Teacher = mongoose.model('Teacher', teacherSchema)

module.exports = Teacher