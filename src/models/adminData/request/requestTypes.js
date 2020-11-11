/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 11-11-202020 15:20:21
 * @modify date 11-11-202020 15:20:21
 * @desc [description]
 */
const College = require('../../collegeData/college/college')

const types = {
    COLLEGE: "College"
}

const getTypesList = function() {
    return [
        "College"
    ]
}

const validateRequest = (type, data) => {
    
    if (type === types.COLLEGE) {
        const college = new College({ ...data })
        const err = college.validateSync()
        if (err) {
            return false
        } return true
    }
    else {
        return false
    }
}

module.exports = {
    types,
    getTypesList,
    validateRequest
}