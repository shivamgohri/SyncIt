/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 10-11-202020 03:32:00
 * @modify date 10-11-202020 03:32:00
 * @desc [description]
 */
const express = require('express')
const app = new express.Router()
const { authenticateUser } = require('../middleware/user')
const { userAvatar } = require('../middleware/avatar')
const sharp = require('sharp')
const User = require('../models/userData/user/user')

// login
app.post('/user/login', async (req, res) => {

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = user.generateAuthToken(req)
        await user.save()
        res.status(200).send({ ...user.getPersonalProfile(), token })
    } catch (err) {
        res.status(400).send({ message: err.message })
    }
})

// logout
app.post('/user/logout', authenticateUser, async (req, res) => {

    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.status(200).send({ status: 'ok' })
    } catch (err) {
        res.status(400).send({ message: err.message })
    }
})

// remove tokens except current
app.delete('/user/tokens', authenticateUser, async (req, res) => {

    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token == req.token
        })
        await req.user.save()
        res.status(200).send({ ...req.user.getPersonalProfile() })
    } catch (err) {
        res.status(400).send({ message: err.message })
    }
})

// create user
app.post('/user', async (req, res) => {

    try {
        const user = new User(req.body)
        const token = user.generateAuthToken(req)
        await user.save()
        res.status(201).send({ ...user.getPersonalProfile(), token })
    } catch (err) {
        res.status(400).send({ message: err.message })
    }
})

// get user
app.get('/user', authenticateUser, async (req, res) => {

    try {
        res.status(200).send({ ...req.user.getPersonalProfile() })
    } catch (err) {
        res.status(404).send({ message: err.message })
    }
})

app.get('/user/:id', async (req, res) => {

    try {
        const user = await User.findById({ _id: req.params.id })
        if (!user) { return res.status(404).send() }
        res.send({ ...user.getPublicProfile() })
    } catch (err) {
        res.status(404).send({ message: err.message })
    }
})

// update
app.patch('/user', authenticateUser, async (req, res) => {

    try {
        if (req.body.password) {
            req.body.password = await req.user.getHashedPassword(req.body.password)
        }
        const updatedUser = await User.findByIdAndUpdate({ _id: req.user._id }, req.body, { new: true })
        res.status(200).send({ ...updatedUser.getPersonalProfile() })
    } catch (err) {
        res.status(400).send({ message: err.message })
    }
})

// delete
app.delete('/user', authenticateUser, async (req, res) => {

    try {
        await req.user.remove()
        res.status(200).send({ status: 'ok' })
    } catch (err) {
        res.send(400).send({ message: err.message })
    }
})

// update avatar
app.post('/user/avatar', authenticateUser, userAvatar.single('avatar'), async (req, res) => {

    try {
        const buffer = await sharp(req.file.buffer).resize({
            width: 250,
            height: 250
        }).png().toBuffer()
        req.user.avatar = buffer
        await req.user.save()
        res.status(200).send({ ...req.user.getPersonalProfile() })
    } catch (err) {
        res.status(400).send({ message: err.message })
    }
}, (err, req, res, next) => {
    res.status(400).send({ message: err.message })
})

// avatar url
app.get('/user/:id/avatar', async (req, res) => {

    try {
        const user = await User.findById({ _id: req.params.id })
        if (!user || !user.avatar) {
            return res.status(404).send()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (err) {
        res.status(404).send()
    }
})

module.exports = app