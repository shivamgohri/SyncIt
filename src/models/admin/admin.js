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
        const admin = await Admin.find({ email, secret })

        if (!admin) {
            throw new Error('Credentials invalid')
        }

        return admin
    } catch (err) {
        throw new Error('Credentials invalid')
    }
}

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin