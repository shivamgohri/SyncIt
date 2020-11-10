/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 09-11-202020 42:37:23
 * @modify date 09-11-202020 42:37:23
 * @desc [description]
 */
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const teacherSchema = require('./teacherSchema')

// STATICS
teacherSchema.statics.findByCredentials = async (email, password) => {
    const teacher = await Teacher.findOne({ email })

    if (!teacher) {
        throw new Error('Credentials incorrect')
    }

    const isMatch = await bcrypt.compare(password, teacher.password)

    if (!isMatch) {
        throw new Error('Credentials incorrect')
    }

    return teacher
}

const Teacher = mongoose.model('Teacher', teacherSchema)

module.exports = Teacher