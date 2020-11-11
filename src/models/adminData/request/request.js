/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 11-11-202020 17:36:16
 * @modify date 11-11-202020 17:36:16
 * @desc [description]
 */
const mongoose = require('mongoose')
const requestSchema = require('./requestSchema')
const requestTypes = require('./requestTypes')

// STATICS
requestSchema.statics.handleRequest = async (type, data) => {
    
    try {
        const isValidRequest = await requestTypes.validateRequest(type, data)
        if (!isValidRequest) {
            return undefined
        }
        const request = new Request({ data, type })
        return request
    } catch (err) {
        return undefined
    }
}

const Request = mongoose.model('Request', requestSchema)

module.exports = Request