/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 09-11-202020 00:37:23
 * @modify date 09-11-202020 00:37:23
 * @desc [description]
 */
const collegeSchema = require('./collegeSchema')

collegeSchema.methods.getProfile = function() {
    const college = this
    const collegeProfile = college.toObject()

    delete collegeProfile.avatar

    if (college.avatar) {
        collegeProfile.avatarUrl = college.getAvatarUrl()
    }
    return collegeProfile
}

collegeSchema.methods.getAvatarUrl = function() {
    return process.env.API_URL + '/college/' + this._id + '/avatar'
}
