/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 10-11-202020 59:31:00
 * @modify date 10-11-202020 59:31:00
 * @desc [description]
 */
const express = require('express')
const app = new express.Router()
const { authenticateTeacher } = require('../middleware/teacher')
const { authenticateCollegeAdmin } = require('../middleware/college')
const { addUpdatesToArray, authenticateCourseAdmin } = require('../middleware/course')
const Course = require('../models/collegeData/course/course')

// create 
app.post('/course', authenticateTeacher, authenticateCollegeAdmin, async (req, res) => {

    try {
        const course = new Course({ ...req.body, collegeId: req.college._id })
        await course.save()
        req.college.numberOfCourses += 1
        await req.college.save()
        res.status(201).send({ ...course.getProfile() })
    } catch (err) {
        res.status(400).send({ message: 'Invalid Request', dev: err.message })
    }
})

// update
app.patch('/course/:id', authenticateTeacher, authenticateCourseAdmin, addUpdatesToArray, async (req, res) => {
    
    try {
        const course = await Course.findOneAndUpdate(
            { _id: req.course._id }, 
            req.body, { new: true, runValidators: true }
        )
        res.status(200).send({ ...course.getProfile() })
    } catch (err) {
        res.status(400).send({ message: 'Invalid Request', dev: err.message })
    }
})

module.exports = app