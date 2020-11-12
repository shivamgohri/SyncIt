/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 11-11-202020 07:37:16
 * @modify date 11-11-202020 07:37:16
 * @desc [description]
 */
const requestSchema = require('./requestSchema')
const requestTypes = require('./requestTypes')

requestSchema.methods.getProfile = function() {
    const request = this
    const requestProfile = request.toObject()

    return requestProfile
} 

requestSchema.methods.sendAccept = async function(accepter) {
    
    try {
        const request = this
        const createdDoc = await requestTypes.createAcceptedRequestDoc(request.type, request.data) 
        request.data = { docId: createdDoc._id }
        request.accepted = true
        request.accepter = accepter
        await request.save()
        return createdDoc
    } catch (err) {
        throw err
    }
}