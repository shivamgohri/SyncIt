/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 09-11-202020 37:37:23
 * @modify date 09-11-202020 37:37:23
 * @desc [description]
 */
const yearSchema = require('./yearSchema')

yearSchema.virtual('classes', {
    localField: '_id',
    ref: 'Class',
    foreignField: 'yearId'
})