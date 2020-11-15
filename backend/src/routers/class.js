/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 10-11-202020 54:31:00
 * @modify date 10-11-202020 54:31:00
 * @desc [description]
 */
const express = require('express')
const app = new express.Router()
const { authenticateTeacher } = require('../middleware/teacher')
const { authenticateYearAdmin } = require('../middleware/year')
const { authenticateClassAdmin } = require('../middleware/class')
const { status, statusTypes } = require('../models/collegeData/class/classStatusTypes')
const Class = require('../models/collegeData/class/class')

// create
app.post('/year/:id/class', authenticateTeacher, authenticateYearAdmin, async (req, res) => {

    try {
        var onTimeStatus = status.ONTIME
        const newClass = new Class({ 
            ...req.body, 
            status: onTimeStatus,
            message: statusTypes.get(onTimeStatus),
            teacherId: req.teacher._id,
            collegeId: req.year.collegeId,
            yearId: req.year._id,
            courseId: req.year.courseId
        })
        await newClass.save()
        res.status(201).send({ ...newClass.getProfile() })
    } catch (err) {
        res.status(400).send({ message: 'Invalid Request', dev: err.message })
    }
})

// update 
app.post('/class/:id/:status', authenticateTeacher, authenticateClassAdmin, async(req, res) => {

    try {
        const cClass = req.class
        if (!cClass) return res.status(404).send()
        const isSuccess = await cClass.updateStatus(cClass, parseInt(req.params.status), req.body.message)
        if (!isSuccess) throw new Error('Updates invalid')
        await cClass.save()
        res.send({ ...cClass.getProfile() })
    } catch (err) {
        res.status(400).send({ message: 'Invalid Request', dev: err.message })
    }
})

// get
app.get('/class/:id', async (req, res) => {

    try {
        const cClass = await Class.findById({ _id: req.params.id })
        if (!cClass) {
            return res.status(404).send()
        }
        res.send({ ...cClass.getProfile() })
    } catch (err) {
        res.status(400).send({ message: 'Invalid Request', dev: err.message })
    }
})

module.exports = app