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
const { collegeAvatar } = require('../middleware/avatar')
const sharp = require('sharp')

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
app.patch('/college/:id', authenticateTeacher, authenticateCollegeAdmin, addUpdatesToArray, async (req, res) => {

    try {
        const college = await College.findOneAndUpdate(
            { _id: req.college._id }, 
            req.body, { new: true, runValidators: true }
        )
        res.status(200).send({ ...college.getProfile() }) 
    } catch (err) {
        res.status(400).send({ message: 'Invalid Request', dev: err.message })
    }
})

// update avatar
app.post('/college/avatar', authenticateTeacher, authenticateCollegeAdmin, collegeAvatar.single('avatar'), async (req, res) => {

    try {
        const buffer = await sharp(req.file.buffer).resize({
            width: 250,
            height: 250
        }).png().toBuffer()
        req.college.avatar = buffer
        await req.college.save()
        res.send({ ...req.college.getProfile() })
    } catch (err) {
        res.status(400).send({ message: 'Invalid Request', dev: err.message })
    }
})

// get avatar
app.get('/college/:id/avatar', async (req, res) => {

    try {
        const college = await College.findById({ _id: req.params.id })
        if (!college || !college.avatar) {
            return res.status(404).send()
        }

        res.set('Content-Type', 'image/png')
        res.send(college.avatar)
    } catch (err) {
        res.status(400).send({ message: 'Invalid Request', dev: err.message })
    }
})

module.exports = app