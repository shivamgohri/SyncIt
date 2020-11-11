/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 11-11-202020 58:57:02
 * @modify date 11-11-202020 58:57:02
 * @desc [description]
 */
const express = require('express')
const app = new express.Router()
const { verifyCreateAdmin } = require('../middleware/admin')
const Admin = require('../models/adminData/admin/admin')

// create
app.post('/admin', verifyCreateAdmin, async (req, res) => {
    
    try {
        req.body.secret = await Admin.getAdminSecret()
        const admin = new Admin(req.body)
        admin.generateAuthToken(req)
        await admin.save()
        res.status(201).send({ 
            ...admin.getPersonalProfile(), 
            message: 'Login Secret will be sent to you' 
        })
    } catch (err) {
        res.status(403).send({ message: err.message })
    }
})

// login
app.post('/admin/login', async (req, res) => {

    try {
        const admin = await Admin.findByCredentials(req.body.email, req.body.secret)
        const token = admin.generateAuthToken(req, req.query.one)        
        await admin.save()
        res.status(200).send({ ...admin.getPersonalProfile() })
    } catch (err) {
        res.status(403).send({ message: err.message })
    }
})

module.exports = app