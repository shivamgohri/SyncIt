/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 09-11-202020 17:37:23
 * @modify date 09-11-202020 17:37:23
 * @desc [description]
 */
const courseSchema = require('./courseSchema')

courseSchema.methods.getProfile = function() {
    const course = this.toObject()
    return course
}