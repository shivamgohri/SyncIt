/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 09-11-202020 42:36:23
 * @modify date 09-11-202020 42:36:23
 * @desc [description]
 */
const mongoose = require('mongoose')

const classSchema = new mongoose.Schema({
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
    }
}, {
    timestamps: true
})

module.exports = classSchema

require('./classSchemaVirtual')
require('./classSchemaMethods')
require('./classSchemaStatics')