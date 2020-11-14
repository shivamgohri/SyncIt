/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 09-11-202020 58:37:23
 * @modify date 09-11-202020 58:37:23
 * @desc [description]
 */
const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College'
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        maxlength: 30,
        validate(email) {
            if (!validator.isEmail(email)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        maxlength: 256,
        validate(password) {
            if (password.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain password')
            }
        }
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30,
        validate(firstName) {
            if (firstName === "") {
                throw new Error('First Name is compulsory')
            }

            firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1)
        }
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30,
        validate(lastName) {
            if (lastName === "") {
                throw new Error('Last Name is compulsory')
            }

            lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1)
        }
    },
    countryCode: {
        type: Number, 
        validate(code) {
            if (code.toString().length > 6) {
                throw new Error('Country Code is invalid')
            }
        }
    },
    number: {
        type: Number,
        unique: true,
        validate(number) {
            if (number.toString().length != 10) {
                throw new Error('10 digit number is required')
            }
        }
    },
    avatar: {
        type: Buffer
    },
    tokens: [{
        token: {
            type: String,
            maxlength: 200,
            required: true
        },
        host: {
            type: String,
            maxlength: 200,
            required: true
        },
        remoteAddress: {
            type: String,
            maxlength: 32,
            required: true
        }
    }]
}, {
    timestamps: true
})

module.exports = userSchema

require('./userSchemaVirtual')
require('./userSchemaMethods')