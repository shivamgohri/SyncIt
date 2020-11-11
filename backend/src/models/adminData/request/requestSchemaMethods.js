/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 11-11-202020 07:37:16
 * @modify date 11-11-202020 07:37:16
 * @desc [description]
 */
const requestSchema = require('./requestSchema')

requestSchema.methods.getProfile = function() {
    const request = this
    const requestProfile = request.toObject()

    return requestProfile
} 