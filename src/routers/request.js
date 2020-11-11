/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 11-11-202020 46:51:23
 * @modify date 11-11-202020 46:51:23
 * @desc [description]
 */
const express = require('express')
const app = new express.Router()
const { verifyRequest } = require('../middleware/request')
const Request = require('../models/adminData/request/request')

// create request
app.post('/request', verifyRequest, async (req, res) => {

    try {
        const request = await Request.handleRequest(req.body.type, req.body.data)
        await request.save()
        res.status(201).send({ ...request.getProfile() })
    } catch (err) {
        res.status(400).send({ message: 'Invalid Request' })
    }
})

module.exports = app