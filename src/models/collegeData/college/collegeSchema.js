/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 09-11-202020 57:36:23
 * @modify date 09-11-202020 57:36:23
 * @desc [description]
 */
const mongoose = require('mongoose')
const validator = require('validator')
const { countriesList } = require('../../../other/utilities')

const collegeSchema = new mongoose.Schema({
    shortName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 4
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 64
    },
    email: {
        type: String, 
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        maxlength: 64,
        validate(email) {
            if (!validator.isEmail(email)) {
                throw new Error('Email is invalid')
            }
        }
    },
    contacts: [{
        countryCode: {
            type: Number,
            required: true,
            validate(code) {
                if (code.toString().length > 6) {
                    throw new Error('Country Code is invalid')
                }
            }
        },
        number: {
            type: Number,
            unique: true,
            required: true,
            validate(number) {
                if ((number.toString().length != 10) && (number.toString().length != 7)) {
                    throw new Error('Number is invalid')
                }
            }
        }
    }],
    image: {
        type: Buffer
    },
    address: {
        type: String,
        required: true,
        trim: true,
        maxlength: 256
    },
    city: {
        type: String,
        required: true,
        trim: true,
        maxlength: 64,
        lowercase: true,
        get: function(it) {return it[0].toUpperCase() + it.slice(1)}
    },
    pincode: {
        type: Number,
        required: true,
        validate(pincode) {
            if (pincode.toString().length > 10) {
                throw new Error('Pincode is invalid')
            }
        }
    },
    state: {
        type: String,
        required: true,
        trim: true,
        maxlength: 64,
        lowercase: true,
        get: function(it) {return it[0].toUpperCase() + it.slice(1)}
    },
    country: {
        type: String,
        required: true,
        enum: ['India']
    },
    numberOfCourses: {
        type: Number,
        default: 0,
        min: 0
    },
    admins: [{
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            unique: true,
            ref: 'Teacher'
        }
    }]
}, {
    timestamps: true
})

module.exports = collegeSchema

require('./collegeSchemaVirtual')
require('./collegeSchemaMethods')