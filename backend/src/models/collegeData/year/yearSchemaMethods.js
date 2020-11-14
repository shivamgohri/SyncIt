/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 09-11-202020 32:37:23
 * @modify date 09-11-202020 32:37:23
 * @desc [description]
 */
const yearSchema = require('./yearSchema')

yearSchema.methods.getProfile = function() {
    const year = this.toObject()
    return year
}