/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 15-11-202020 07:55:22
 * @modify date 15-11-202020 07:55:22
 * @desc [description]
 */
const Class = require('../models/collegeData/class/class')

const authenticateClassAdmin = async (req, res, next) => {

    try {
        const cClass = await Class.findOne({ 
            _id: req.params.id, 
            teacherId: req.teacher._id, 
            collegeId: req.teacher.collegeId 
        })
        if (!cClass) return res.status(404).send()
        req.class = cClass
        next()
    } catch (err) {
        res.status(403).send({ message: 'Not Authorized', dev: err.message })
    }
}

module.exports = { authenticateClassAdmin }