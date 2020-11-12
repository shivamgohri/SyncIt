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

// Routers
const collegeRouter = require('./routers/college')
const courseRouter = require('./routers/course')
const yearRouter = require('./routers/year')
const classRouter = require('./routers/class')
const teacherRouter = require('./routers/teacher')
const userRouter = require('./routers/user')
const adminRouter = require('./routers/admin')
const requestRouter = require('./routers/request')
const adminPrivilegesRouter = require('./routers/adminPrivileges')

// App Server uses
app.use(express.json())
app.use(collegeRouter)
app.use(courseRouter)
app.use(yearRouter)
app.use(classRouter)
app.use(teacherRouter)
app.use(userRouter)
app.use(adminRouter)
app.use(requestRouter)
app.use(adminPrivilegesRouter)

app.listen(port, () => {
    console.log('Express Server started on port - ' + port)
})