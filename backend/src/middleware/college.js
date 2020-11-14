/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 11-11-202020 44:35:16
 * @modify date 11-11-202020 44:35:16
 * @desc [description]
 */
const College = require('../models/collegeData/college/college')

const authenticateCollegeAdmin = async (req, res, next) => {

    try {
        req.body.collegeId = req.teacher.collegeId
        const college = await College.findOne({ _id: req.body.collegeId, 'admins.admin': req.teacher._id })
        if (!college) {
            throw new Error('Invalid Request')
        }
        req.college = college
        req.collegeAdmin = req.teacher
        next()
    } catch (err) {
        res.status(403).send({ message: 'Invalid Request', dev: err.message })
    }
}

const addUpdatesToArray = (req, res, next) => {
    if (req.body.admins) {
        req.body.admins = req.college.admins.concat(req.body.admins)
    }
    if (req.body.contacts) {
        req.body.contacts = req.college.contacts.concat(req.body.contacts)
    }
    next()
}

module.exports = {
    authenticateCollegeAdmin,
    addUpdatesToArray
}