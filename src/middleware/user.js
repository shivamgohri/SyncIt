const jwt = require('jsonwebtoken')
const User = require('../models/userData/user/user')

const authenticateUser = async (req, res, next) => {

    try {
        if (!req.header('Authorization')) {
            throw new Error('Please authenticate')
        }
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error('Please authenticate')
        }

        req.token = token
        req.user = user
        next()
    } catch (err) {
        res.status(404).send({ message: err.message })
    }
}

module.exports = {
    authenticateUser
}