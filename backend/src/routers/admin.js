/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 11-11-202020 58:57:02
 * @modify date 11-11-202020 58:57:02
 * @desc [description]
 */
const express = require('express')
const app = new express.Router()
const { verifyCreateAdmin, authenticateAdmin } = require('../middleware/admin')
const Admin = require('../models/adminData/admin/admin')

// create
app.post('/admin', verifyCreateAdmin, async (req, res) => {
    
    try {
        req.body.secret = await Admin.getAdminSecret()
        const admin = new Admin(req.body)
        const token = admin.generateAuthToken(req)
        await admin.save()
        res.status(201).send({ 
            ...admin.getPersonalProfile(), 
            message: 'Login Secret will be sent to you',
            token 
        })
    } catch (err) {
        res.status(403).send({ message: 'Invalid Request', dev: err.message })
    }
})

// login
app.post('/admin/login', async (req, res) => {

    try {
        const admin = await Admin.findByCredentials(req.body.email, req.body.secret)
        const token = admin.generateAuthToken(req, req.query.one)        
        await admin.save()
        res.status(200).send({ ...admin.getPersonalProfile(), token })
    } catch (err) {
        res.status(403).send({ message: 'Invalid Request', dev: err.message })
    }
})

// accept request
app.post('/admin/accept', authenticateAdmin, async (req, res) => {

    try {
        const request = await Admin.handleAccept(req.body.requestId)
        if (request.accepted) {
            throw new Error('Request already accepted')
        }
        const createdDoc = await request.sendAccept(req.admin._id)
        res.status(201).send({ ...createdDoc._doc, type: request.type })
    } catch (err) {
        res.status(400).send({ message: 'Invalid Request', dev: err.message })
    }
})

module.exports = app