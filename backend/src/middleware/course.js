/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 14-11-202020 10:25:23
 * @modify date 14-11-202020 10:25:23
 * @desc [description]
 */
const Course = require("../models/collegeData/course/course")

const addUpdatesToArray = (req, res, next) => {    
    if (req.body.admins) {
        req.body.admins = req.course.admins.concat(req.body.admins)
    }
    next()
}

const authenticateCourseAdmin = async (req, res, next) => {

    try {
        const course = await Course.findOne({
            _id: req.params.id, 
            collegeId: req.teacher.collegeId,
            'admins.admin': req.teacher._id
        })
        if (!course) {
            throw new Error('teacher not found')
        }
        req.course = course
        req.courseAdmin = req.teacher
        next()
    } catch (err) {
        res.status(400).send({ message: 'Invalid Request', dev: err.message })
    }
}

module.exports = {
    addUpdatesToArray,
    authenticateCourseAdmin
}