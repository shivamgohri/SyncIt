/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 11-11-202020 33:04:03
 * @modify date 11-11-202020 33:04:03
 * @desc [description]
 */
const mongoose = require('mongoose')
const validator = require('validator')

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 64
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(email) {
            if (!validator.isEmail(email)) {
                throw new Error('Email is invalid')
            }
        }
    },
    secret: {
        type: String,
        required: true,
        unique: true,
        maxlength: 1024
    },
    tokens: [{
        token: {
            type: String,
            required: true,
            trim: true
        },
        host: {
            type: String,
            maxlength: 200,
            required: true
        }
    }]
}, {
    timestamps: true
})

module.exports = adminSchema

require('./adminSchemaVirtual')
require('./adminSchemaMethods')