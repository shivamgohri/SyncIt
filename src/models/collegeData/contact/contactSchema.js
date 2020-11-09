/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 09-11-202020 08:37:23
 * @modify date 09-11-202020 08:37:23
 * @desc [description]
 */
const mongoose = require('mongoose')

const contactSchem = new mongoose.Schema({
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
            if ((number.toString().length != 10) || (number.toString().length != 7)) {
                throw new Error('Number is invalid')
            }
        }
    },
})

module.exports = contactSchem