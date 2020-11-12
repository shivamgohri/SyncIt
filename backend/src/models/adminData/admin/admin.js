/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 11-11-202020 29:04:03
 * @modify date 11-11-202020 29:04:03
 * @desc [description]
 */
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const generator = require('generate-password')
const adminSchema = require('./adminSchema')
const Request = require('../request/request')

// STATICS
adminSchema.statics.getAdminSecret = async function() {
    
    try {
        const secretRaw = generator.generate({
            length: 64,
            numbers: true,
            symbols: true,
            lowercase: true,
            uppercase: true,
            strict: true
        })
        const secret = await bcrypt.hash(secretRaw, 12)
        return secret
    } catch (err) {
        throw new Error('Could not create secret')
    }
}

adminSchema.statics.findByCredentials = async (email, secret) => {
    
    try {
        const admin = await Admin.findOne({ email, secret })

        if (!admin) {
            throw new Error('Credentials invalid')
        }

        return admin
    } catch (err) {
        throw new Error('Credentials invalid')
    }
}

adminSchema.statics.handleAccept = async (requestId) => {

    try {
        if (!requestId) {
            throw new Error('Invalid Request')
        }    
        const request = await Request.findById({ _id: requestId })
        if (!request) {
            throw new Error('Invalid Request')
        }
        return request
    } catch (err) {
        throw err
    }
}

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin