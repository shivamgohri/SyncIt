/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 09-11-202020 42:36:23
 * @modify date 09-11-202020 42:36:23
 * @desc [description]
 */
const mongoose = require('mongoose')
const { getStatusTypes } = require('./classStatusTypes')

const classSchema = new mongoose.Schema({
    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'College'
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Course'
    },
    yearId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Year'
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Teacher'
    },
    startTime: {
        type: String,
        required: true,
        trim: true,
        maxlength: 4,
        minlength: 4,
        validate(time) {
            if (time < "0000" || time > "2359") {
                throw new Error('Time is not Valid')
            }
        }
    },
    endTime: {
        type: String,
        required: true,
        trim: true,
        maxlength: 4,
        minlength: 4,
        validate(time) {
            if (time < "0000" || time > "2359") {
                throw new Error('Time is not Valid')
            }
        }
    },
    day: {
        type: Number,
        required: true,
        // 0 - Monday, ...
        enum: [0,1,2,3,4,5,6]
    },
    subject: {
        type: String,
        required: true,
        maxlength: 64
    },
    status: {
        type: Number,
        required: true,
        enum: getStatusTypes()
    },
    message: {
        type: String,
        required: true,
        maxlength: 252
    }
}, {
    timestamps: true
})

module.exports = classSchema

require('./classSchemaVirtual')
require('./classSchemaMethods')