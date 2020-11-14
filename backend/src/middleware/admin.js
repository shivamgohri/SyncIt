/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 11-11-202020 30:35:16
 * @modify date 11-11-202020 30:35:16
 * @desc [description]
 */
const Admin = require('../models/adminData/admin/admin')
const jwt = require('jsonwebtoken')

const verifyCreateAdmin = (req, res, next) => {
    
    try {
        if (!req.body.email || !req.body.secret || !req.body.name) {
            throw new Error('Credentials Missing')
        }

        if (JSON.stringify(process.env.ADMIN_CREATE_SECRET)===JSON.stringify(req.body.secret)) {
            return next()
        }
    
        throw new Error('Not Authorized')
    } catch (err) {
        res.status(403).send({ message: 'Invalid Request', dev: err.message })
    }
}

const authenticateAdmin = async (req, res, next) => {

    try {
        if (!req.header('Authorization')) {
            throw new Error('Please authenticate')
        }
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const admin = await Admin.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!admin) {
            throw new Error('Not Authorized')
        }
        req.token = token
        req.admin = admin
        next()
    } catch (err) {
        res.status(403).send({ message: 'Not Authorized', dev: err.message })
    }
}

module.exports = {
    verifyCreateAdmin,
    authenticateAdmin
}