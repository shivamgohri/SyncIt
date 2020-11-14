const College = require("../models/collegeData/college/college")

/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 14-11-202020 11:53:23
 * @modify date 14-11-202020 11:53:23
 * @desc [description]
 */
const findCollegeByParams = async (req, res, next) => {

    try {
        const college = await College.findOne({ _id: req.params.id })
        if (!college) {
            throw new Error('College Id invalid')
        }
        req.college = college
        next()
    } catch (err) {
        res.status(400).send({ message: 'Invalid Request', dev: err.message })
    }
}

module.exports = {
    findCollegeByParams
}