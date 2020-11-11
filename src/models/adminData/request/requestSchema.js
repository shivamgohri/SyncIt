/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 11-11-202020 37:36:16
 * @modify date 11-11-202020 37:36:16
 * @desc [description]
 */
const mongoose = require('mongoose')
const requestTypes = require('./requestTypes')

const requestSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        trim: true,
        enum: requestTypes.getTypesList()
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    accepted: {
        type: Boolean,
        default: false
    },
    acceptedById: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    }
}, {
    timestamps: true
})

module.exports = requestSchema

require('./requestSchemaVirtual')
require('./requestSchemaMethods')