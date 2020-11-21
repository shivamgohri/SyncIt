/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 09-11-202020 02:38:23
 * @modify date 09-11-202020 02:38:23
 * @desc [description]
 */
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userSchema = require('./userSchema')
const College = require('../../collegeData/college/college')
const Course = require('../../collegeData/course/course')
const Year = require('../../collegeData/year/year')

userSchema.pre('save', async function(next) {
    const user = this

    if (user.isModified('password')) {
        user.password = user.getHashedPassword(user.password)
    }
    next()
})

userSchema.methods.generateAuthToken = function(req) {
    const user = this
    const token = jwt.sign({
        _id: user._id.toString(),
    }, process.env.JWT_SECRET_KEY, {
        expiresIn: 6 * 31 * 24 * 60 * 60
    })

    const tokenObject = { token }

    if (req.headers['user-agent'])
        tokenObject.host = req.headers['user-agent']
    else
        tokenObject.host = 'Undefined'

    if (req.connection.remoteAddress) 
        tokenObject.remoteAddress = req.connection.remoteAddress
    else
        tokenObject.remoteAddress = 'Undefined'

    user.tokens = user.tokens.concat(tokenObject)
    return token
}

userSchema.methods.getFullName = function() {
    return this.firstName + ' ' + this.lastName
}

// PROFILE
userSchema.methods.getPersonalProfile = function() {
    const user = this
    const userPersonalProfile = user.toObject()

    delete userPersonalProfile.password
    delete userPersonalProfile.avatar

    if (user.avatar) {
        userPersonalProfile.avatarUrl = user.getAvatarUrl()
    }

    userPersonalProfile.fullName = user.getFullName()
    return userPersonalProfile
}

userSchema.methods.getPublicProfile = function() {
    const userPublicProfile = this.toObject()

    delete userPublicProfile.password
    delete userPublicProfile.avatar
    delete userPublicProfile.tokens

    if (this.avatar) {
        userPublicProfile.avatarUrl = this.getAvatarUrl()
    }

    userPublicProfile.fullName = this.getFullName()
    return userPublicProfile
}

// UTILITIES
userSchema.methods.getHashedPassword = async function(password) {
    const newPassword = await bcrypt.hash(password, 8)
    return newPassword
}

userSchema.methods.getAvatarUrl = function() {
    return process.env.API_URL + '/user/' + this._id + '/avatar'
}

// SUBSCRIPTION
userSchema.methods.subscribe = async function(yearId, courseId, collegeId) {
    if (!yearId || !courseId || !collegeId) { throw new Error('Missing fields') }
    try {
        await Promise.all([
            await this.subscribeUser(yearId, courseId, collegeId),
            await this.subscribeCollege(collegeId),
            await this.subscribeCourse(courseId),
            await this.subscribeYear(yearId)
        ])
    } catch (err) {
        throw err
    }
}

userSchema.methods.unsubscribe = async function(yearId, courseId, collegeId) {
    if (!yearId || !courseId || !collegeId) { throw new Error('Missing fields') }
    try {
        await Promise.all([
            await this.unsubscribeUser(yearId, courseId, collegeId),
            await this.unsubscribeCollege(collegeId),
            await this.unsubscribeCourse(courseId),
            await this.unsubscribeYear(yearId)
        ])
    } catch (err) {
        throw err
    }
}

// subscription - USER
userSchema.methods.subscribeUser = async function(yearId, courseId, collegeId) {
    try {
        this.yearId = yearId
        this.courseId = courseId
        this.collegeId = collegeId
        this.isSubscribed = true
        await this.save()
    } catch (err) {
        throw err
    }
}

userSchema.methods.unsubscribeUser = async function(yearId, courseId, collegeId) {
    try {
        this.yearId = undefined
        this.courseId = undefined
        this.collegeId = undefined
        this.isSubscribed = false
        await this.save()
    } catch (err) {
        throw err
    }
}

// subscription - COLLEGE
userSchema.methods.subscribeCollege = async function(collegeId) {
    try {
        const college = await College.findById({ _id: collegeId })
        if (!college) { throw new Error('College not found') }
        college.students = college.students.concat({ student: this._id })
        await college.save()
    } catch (err) {
        throw err
    }
}

userSchema.methods.unsubscribeCollege = async function(collegeId) {
    try {
        const college = await College.findById({ _id: collegeId })
        if (!college) { throw new Error('College not found') }
        college.students = college.students.filter((student) => student.student == this._id)
        await college.save()
    } catch (err) {
        throw err
    }
}


// subscription - COURSE
userSchema.methods.subscribeCourse = async function(courseId) {
    try {
        const course = await Course.findById({ _id: courseId })
        if (!course) { throw new Error('Course not found') }
        course.students = course.students.concat({ student: this._id })
        await course.save()
    } catch (err) {
        throw err
    }
}

userSchema.methods.unsubscribeCourse = async function(courseId) {
    try {
        const course = await Course.findById({ _id: courseId })
        if (!course) { throw new Error('Course not found') }
        course.students = course.students.filter((student) => student.student == this._id)
        await course.save()
    } catch (err) {
        throw err
    }
}

// subscription - YEAR
userSchema.methods.subscribeYear = async function(yearId) {
    try {
        const year = await Year.findById({ _id: yearId })
        if (!year) { throw new Error('Year not found') }
        year.students = year.students.concat({ student: this._id })
        await year.save()
    } catch (err) {
        throw err
    }
}

userSchema.methods.unsubscribeYear = async function(yearId) {
    try {
        const year = await Year.findById({ _id: yearId })
        if (!year) { throw new Error('Year not found') }
        year.students = year.students.filter((student) => student.student == this._id)
        await year.save()
    } catch (err) {
        throw err
    }
}