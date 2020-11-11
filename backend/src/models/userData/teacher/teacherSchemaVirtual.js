/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 09-11-202020 52:37:23
 * @modify date 09-11-202020 52:37:23
 * @desc [description]
 */
const teacherSchema = require('./teacherSchema')

teacherSchema.virtual('classes', {
    localField: '_id',
    ref: 'Class',
    foreignField: 'teacherId'
})