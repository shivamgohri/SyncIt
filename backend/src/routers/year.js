/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 10-11-202020 06:32:00
 * @modify date 10-11-202020 06:32:00
 * @desc [description]
 */
const express = require('express')
const app = new express.Router()
const { authenticateUser } = require('../middleware/user')
const { authenticateCourseAdmin } = require('../middleware/course')
const { authenticateTeacher } = require('../middleware/teacher')
const { addUpdatesToArray, authenticateYearAdmin } = require('../middleware/year')
const Year = require('../models/collegeData/year/year')

// create
app.post('/course/:id/year', authenticateTeacher, authenticateCourseAdmin, async (req, res) => {

    try {
        const year = new Year({ ...req.body, courseId: req.course._id, collegeId: req.teacher.collegeId })
        await year.save()
        res.status(201).send({ ...year.getProfile() })
    } catch (err) {
        res.status(400).send({ message: 'Invalid Request', dev: err.message })
    }
})

// get year
app.get('/year/:id', async (req, res) => {

    try {
        const year = await Year.findById({ _id: req.params.id })
        if (!year) { return res.status(404).send() }
        res.status(200).send({ ...year.getProfile() })
    } catch (err) {
        res.status(400).send({ message: 'Invalid Request', dev: err.message })
    }
})

// update
app.patch('/year/:id', authenticateTeacher, authenticateYearAdmin, addUpdatesToArray, async (req, res) => {

    try {
        const year = await Year.findOneAndUpdate(
            { _id: req.year._id }, 
            req.body, { new: true, runValidators: true }
        )
        res.status(200).send({ ...year.getProfile() })
    } catch (err) {
        res.status(400).send({ message: 'Invalid Request', dev: err.message })
    }
})

// subscribe to college
app.post('/year/:id/subscribe', authenticateUser, async (req, res) => {

    try {
        const year = await Year.findById({ _id: req.params.id })
        if (!year) { return res.status(404).send() }
        await req.user.subscribe(year._id, year.courseId, year.collegeId)
        res.send()
    } catch (err) {
        res.status(400).send({ message: 'Invalid Request', dev: err.message })
    }
})

// unsubscribe to college
app.delete('/year/:id/subscribe', authenticateUser, async (req, res) => {

    try {
        const year = await Year.findById({ _id: req.params.id })
        if (!year) { return res.status(404).send() }
        await req.user.unsubscribe(year._id, year.courseId, year.collegeId)
        res.send()
    } catch (err) {
        res.status(400).send({ message: 'Invalid Request', dev: err.message })
    }
})

module.exports = app