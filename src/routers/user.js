/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 10-11-202020 03:32:00
 * @modify date 10-11-202020 03:32:00
 * @desc [description]
 */
const express = require('express')
const app = new express.Router()
const User = require('../models/userData/user/user')

app.post('/user', async (req, res) => {

    try {
        const user = new User(req.body)
        const token = user.generateAuthToken(req)
        await user.save()
        res.status(201).send({ ...user.getPublicProfile(), token })
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
})

app.post('/user/login', async (req, res) => {

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = user.generateAuthToken(req)
        await user.save()
        res.status(200).send({ ...user.getPublicProfile(), token })
    } catch (err) {
        res.status(404).send({ message: err.message })
    }
})

module.exports = app