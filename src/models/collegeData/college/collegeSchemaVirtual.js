/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 09-11-202020 04:37:23
 * @modify date 09-11-202020 04:37:23
 * @desc [description]
 */
const courseSchema = require('../course/courseSchema')
const collegeSchema = require('./collegeSchema')

collegeSchema.virtual('courses', {
    localField: '_id',
    ref: 'Course',
    foreignField: 'collegeId'
})

collegeSchema.virtual('teachers', {
    localField: '_id',
    ref: 'Teacher',
    foreignField: 'collegeId'
})