/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 09-11-202020 29:37:23
 * @modify date 09-11-202020 29:37:23
 * @desc [description]
 */
const mongoose = require('mongoose')

const yearSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Course'
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
    numberOfClasses: {
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

module.exports = yearSchema

require('./yearSchemaVirtual')
require('./yearSchemaMethods')
require('./yearSchemaStatics')