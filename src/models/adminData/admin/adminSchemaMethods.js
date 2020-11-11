/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 11-11-202020 36:04:03
 * @modify date 11-11-202020 36:04:03
 * @desc [description]
 */
const adminSchema = require('./adminSchema')
const jwt = require('jsonwebtoken')
const admin = require('../../../middleware/admin')

adminSchema.methods.generateAuthToken = function(req, removeAllTokensExceptCurrent = "true") {
    const admin = this
    const token = jwt.sign({
        _id: admin._id
    }, process.env.JWT_SECRET_KEY, {
        expiresIn: 6 * 31 * 24 * 60 * 60
    })

    if (req.headers['user-agent'])
        admin.tokens = admin.tokens.concat({ token, host: req.headers['user-agent'] })
    else
        admin.tokens = admin.tokens.concat({ token, host: 'Not Defined!' })

    if (removeAllTokensExceptCurrent == "true") {
        admin.removeAllTokensExceptCurrent(token)
    }

    return token
}

adminSchema.methods.removeAllTokensExceptCurrent = function(currToken) {
    const admin = this
    admin.tokens = admin.tokens.filter((token) => {
        return currToken == token.token
    })
}

adminSchema.methods.getPersonalProfile = function() {
    const admin = this
    const adminPersonalProfile = admin.toObject()

    delete adminPersonalProfile.secret

    return adminPersonalProfile
}