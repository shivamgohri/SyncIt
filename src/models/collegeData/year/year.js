/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 09-11-202020 27:37:23
 * @modify date 09-11-202020 27:37:23
 * @desc [description]
 */
const yearSchema = require('./yearSchema')
const mongoose = require('mongoose')

const Year = mongoose.model('Year', yearSchema)

module.exports = Year