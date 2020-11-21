/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 09-11-202020 15:37:23
 * @modify date 09-11-202020 15:37:23
 * @desc [description]
 */
const mongoose = require('mongoose')
const { hasDublicateAdmins, hasDublicateStudents } = require('../../../other/utilities')

const courseSchema = new mongoose.Schema({
    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'College'
    },
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
    description: {
        type: String,
        trim: true,
        maxlength: 256
    },
    numberOfYears: {
        type: Number,
        default: 0,
        min: 0
    },
    admins: {
        type: [{
            admin: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                unique: true,
                ref: 'Teacher'
            },
        }],
        validate(admins) {
            if (hasDublicateAdmins(admins) || admins.length==0) {
                throw new Error('Admins should be unique')
            }            
        }
    },
    students: {
        type: [{
            student: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                unique: true,
                ref: 'User'
            }
        }],
        validate(students) {
            if (hasDublicateStudents(students)) {
                throw new Error('Students should be unique')
            }
        }
    }
}, {
    timestamps: true
})

module.exports = courseSchema

require('./courseSchemaVirtual')
require('./courseSchemaMethods')