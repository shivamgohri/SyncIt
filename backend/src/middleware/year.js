/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 15-11-202020 54:36:00
 * @modify date 15-11-202020 54:36:00
 * @desc [description]
 */
const Year = require("../models/collegeData/year/year");

const authenticateYearAdmin = async (req, res, next) => {

    try {
        const year = await Year.findOne({
            _id: req.params.id,
            'admins.admin': req.teacher._id,
            collegeId: req.teacher.collegeId
        })
        if (!year) {
            throw new Error('Teacher not authorized')
        }
        req.year = year
        req.yearAdmin = req.teacher
        next()
    } catch (err) {
        res.status(400).send({ message: 'Invalid Request', dev: err.message })
    }
}

const addUpdatesToArray = (req, res, next) => {
    if (req.body.admins) {
        req.body.admins = req.year.admins.concat(req.body.admins)
    }
    next()
}

module.exports = {
    authenticateYearAdmin,
    addUpdatesToArray
}