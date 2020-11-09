/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 09-11-202020 38:36:23
 * @modify date 09-11-202020 38:36:23
 * @desc [description]
 */
const mongoose = require('mongoose')
const classSchema = require('./classSchema')

const Class = mongoose.model('Class', classSchema)

module.exports = Class