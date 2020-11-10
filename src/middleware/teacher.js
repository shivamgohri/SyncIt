const jwt = require('jsonwebtoken')
const Teacher = require('../models/userData/teacher/teacher')

const authenticateTeacher = async (req, res, next) => {

    try {
        if (!req.header('Authorization')) {
            throw new Error('Please authenticate')
        }
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const teacher = await Teacher.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!teacher) {
            throw new Error('Please authenticate')
        }

        req.token = token
        req.teacher = teacher
        next()
    } catch (err) {
        res.status(404).send({ message: err.message })
    }
}

module.exports = {
    authenticateTeacher
}