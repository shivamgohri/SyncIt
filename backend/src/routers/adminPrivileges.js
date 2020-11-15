/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 12-11-202020 52:29:20
 * @modify date 12-11-202020 52:29:20
 * @desc [ { API_URL + '/sudo/' + ... } ]
 */
const express = require('express')
const app = new express.Router()
const { authenticateAdmin } = require('../middleware/admin')
const { addUpdatesToArray } = require('../middleware/college')
const College = require('../models/collegeData/college/college')
const Request = require('../models/adminData/request/request')
const requestTypes = require('../models/adminData/request/requestTypes')
const { findCollegeByParams } = require('../middleware/adminPrivileges')

// create college 
app.post('/sudo/college', authenticateAdmin, async (req, res) => {

    try {
        const college = new College(req.body)
        await college.save()
        const request = new Request({ 
            type: requestTypes.types.COLLEGE,
            accepted: true, accepter: req.admin._id,
            data: { docId: college._id }
        })
        await request.save()
        res.status(201).send({ ...college.getProfile(), request })
    } catch (err) {
        res.status(400).send({ message: err.message })
    }
})

// update
app.patch('/sudo/college/:id', authenticateAdmin, findCollegeByParams, addUpdatesToArray, async (req, res) => {

    try {
        const college = await College.findOneAndUpdate(
            { _id: req.college._id }, 
            req.body, { new: true, runValidators: true 
        })
        res.send({ ...college.getProfile() })
    } catch (err) {
        res.status(400).send({ message: 'Invalid Request', dev: err.message })
    }
})

// delete
app.delete('/sudo/college/:id', authenticateAdmin, async (req, res) => {

    try {
        const college = await College.findByIdAndDelete({ _id: req.params.id })
        if (!college) {
            return res.status(404).send({ message: 'College Not Found', dev: 'collge is not found' })
        }
        // TO-DO => Remove all course, year & classes
        res.send()
    } catch (err) {
        res.status(400).send({ message: 'Invalid Request', dev: err.message })
    }
})

module.exports = app