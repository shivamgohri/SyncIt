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

const createAcceptedRequestDoc =  async function(type, data) {

    try {
        if (!getTypesList().includes(type)) {
            throw new Error('Invalid Request')
        }
        
        if (type===types.COLLEGE) {
            const college = new College({ ...data })
            await college.save()
            return college
        }
        throw new Error('Invalid Request')
    } catch (err) {
        throw err
    }
}

module.exports = {
    types,
    getTypesList,
    validateRequest,
    createAcceptedRequestDoc
}