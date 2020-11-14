/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 10-11-202020 01:32:00
 * @modify date 10-11-202020 01:32:00
 * @desc [description]
 */
const express = require('express')
const app = new express.Router()
const { authenticateTeacher } = require('../middleware/teacher')
const { teacherAvatar } = require('../middleware/avatar')
const sharp = require('sharp')
const Teacher = require('../models/userData/teacher/teacher')

// login
app.post('/teacher/login', async (req, res) => {

    try {
        const teacher = await Teacher.findByCredentials(req.body.email, req.body.password)
        const token = teacher.generateAuthToken(req)
        await teacher.save()
        res.status(200).send({ ...teacher.getPersonalProfile(), token })
    } catch (err) {
        res.status(400).send({ message: err.message })
    }
})

// logout
app.post('/teacher/logout', authenticateTeacher, async (req, res) => {

    try {
        req.teacher.tokens = req.teacher.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.teacher.save()
        res.status(200).send({ status: 'ok' })
    } catch (err) {
        res.status(400).send({ message: err.message })
    }
})

// remove tokens except current
app.delete('/teacher/tokens', authenticateTeacher, async (req, res) => {

    try {
        req.teacher.tokens = req.teacher.tokens.filter((token) => {
            return token.token == req.token
        })
        await req.teacher.save()
        res.status(200).send({ ...req.teacher.getPersonalProfile() })
    } catch (err) {
        res.status(400).send({ message: err.message })
    }
})

// create teacher
app.post('/teacher', async (req, res) => {

    try {
        const teacher = new Teacher(req.body)
        const token = teacher.generateAuthToken(req)
        await teacher.save()
        res.status(201).send({ ...teacher.getPersonalProfile(), token })
    } catch (err) {
        res.status(400).send({ message: err.message })
    }
})

// get
app.get('/teacher', authenticateTeacher, async (req, res) => {

    try {
        res.status(200).send({ ...req.teacher.getPersonalProfile() })
    } catch (err) {
        res.status(404).send({ message: err.message })
    }
})

// update
app.patch('/teacher', authenticateTeacher, async (req, res) => {

    try {
        if (req.body.password) {
            req.body.password = await req.teacher.getHashedPassword(req.body.password)
        }
        const updatedTeacher = await Teacher.findOneAndUpdate(
            { _id: req.teacher._id }, 
            req.body, { new: true, runValidators: true }
        )
        res.status(200).send({ ...updatedTeacher.getPersonalProfile() })
    } catch (err) {
        res.status(400).send({ message: err.message })
    }
})

// delete
app.delete('/teacher', authenticateTeacher, async (req, res) => {

    try {
        await req.teacher.remove()
        res.status(200).send({ status: 'ok' })
    } catch (err) {
        res.send(400).send({ message: err.message })
    }
})

// update avatar
app.post('/teacher/avatar', authenticateTeacher, teacherAvatar.single('avatar'), async (req, res) => {

    try {
        const buffer = await sharp(req.file.buffer).resize({
            width: 250,
            height: 250
        }).png().toBuffer()
        req.teacher.avatar = buffer
        await req.teacher.save()
        res.status(200).send({ ...req.teacher.getPersonalProfile() })
    } catch (err) {
        res.status(400).send({ message: err.message })
    }
}, (err, req, res, next) => {
    res.status(400).send({ message: err.message })
})

// avatar url
app.get('/teacher/:id/avatar', async (req, res) => {

    try {
        const teacher = await Teacher.findById({ _id: req.params.id })
        if (!teacher || !teacher.avatar) {
            return res.status(404).send()
        }

        res.set('Content-Type', 'image/png')
        res.send(teacher.avatar)
    } catch (err) {
        res.status(404).send()
    }
})

module.exports = app