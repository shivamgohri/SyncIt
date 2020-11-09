/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 09-11-202020 12:37:23
 * @modify date 09-11-202020 12:37:23
 * @desc [description]
 */
const mongoose = require('mongoose')
const courseSchema = require('./courseSchema')

const Course = mongoose.model('Course', courseSchema)

module.exports = Course