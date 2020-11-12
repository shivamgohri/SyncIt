/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 10-11-202020 57:31:00
 * @modify date 10-11-202020 57:31:00
 * @desc [description]
 */
const express = require('express')
const app = new express.Router()
const requestTypes = require('../models/adminData/request/requestTypes')
const { authenticateTeacher } = require('../middleware/teacher')
const { authenticateCollegeAdmin, addUpdatesToArray } = require('../middleware/college')
const College = require('../models/collegeData/college/college')

// get college
app.get('/college/:id', async (req, res) => {

    try {
        const college = await College.findById({ _id: req.params.id })
        if (!college) {
            throw new Error('Invalid Request')
        }
        res.send({ ...college.getProfile() })
    } catch (err) {
        res.status(404).send({ message: 'Invalid Request', dev: err.message })
    }
})

// update
app.patch('/college', authenticateTeacher, authenticateCollegeAdmin, addUpdatesToArray, async (req, res) => {

    try {
        const college = await College.findByIdAndUpdate({ _id: req.college._id }, req.body, { new: true })
        res.status(200).send({ ...college.getProfile() }) 
    } catch (err) {
        res.status(400).send({ message: 'Invalid Request', dev: err.message })
    }
})

module.exports = app