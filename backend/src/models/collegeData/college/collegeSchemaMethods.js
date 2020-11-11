/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 09-11-202020 00:37:23
 * @modify date 09-11-202020 00:37:23
 * @desc [description]
 */
const collegeSchema = require('./collegeSchema')

collegeSchema.methods.getShortProfile = () => {
    const college = this
    const collegeShortProfile = {
        _id: college._id,
        name: college.name,
        email: college.email,
        city: college.city,
        state: college.state,
        country: college.country,
        numberOfCourses: college.numberOfCourses,
        createdAt: college.createdAt,
        updatedAt: college.updatedAt
    }
    return collegeShortProfile
}