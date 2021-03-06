/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 09-11-202020 23:37:23
 * @modify date 09-11-202020 23:37:23
 * @desc [description]
 */
const courseSchema = require('./courseSchema')

courseSchema.virtual('years', {
    localField: '_id',
    ref: 'Year',
    foreignField: 'courseId'
})