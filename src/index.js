/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 09-11-202020 05:11:00
 * @modify date 09-11-202020 05:11:00
 * @desc [Main file which will handle express]
 */

const express = require('express')
require('./db/mongoose')

const app = express()
const port = process.env.PORT

// App Server uses
app.use(express.json())

// Routers
app.get('/', async (req, res) => {
    res.send('Hi, Welcome to SyncIt')
})

app.listen(port, () => {
    console.log('Express Server started on port - ' + port)
})