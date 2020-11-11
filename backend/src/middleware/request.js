/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 11-11-202020 48:53:23
 * @modify date 11-11-202020 48:53:23
 * @desc [description]
 */
const Request = require('../models/adminData/request/request')
const requestTypes = require('../models/adminData/request/requestTypes')

const verifyRequest = async (req, res, next) => {

    try {
        if (!req.body.type) {
            throw new Error('Invalid request')
        }
        const requestExists = requestTypes.getTypesList().includes(req.body.type)
        if (!requestExists) {
            throw new Error('Invalid request')
        }
        next()
    } catch (err) {
        res.status(400).send({ message: err.message })
    }
}

module.exports = {
    verifyRequest
}