/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 10-11-202020 57:31:00
 * @modify date 10-11-202020 57:31:00
 * @desc [description]
 */
const express = require('express')
const app = new express.Router()
const College = require('../models/collegeData/college/college')

// create college
app.post('/college', async (req, res) => {

    try {
        const college = new College(req.body)
        await college.save()
        res.status(201).send({ ...college._doc })
    } catch (err) {
        res.status(400).send({ message: err.message })
    }
})

module.exports = app