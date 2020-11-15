/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 09-11-202020 45:36:23
 * @modify date 09-11-202020 45:36:23
 * @desc [description]
 */
const classSchema = require('./classSchema')
const { status, statusTypes, dayNames, getStatusTypes } = require('./classStatusTypes')

classSchema.methods.getProfile = function() {
    const cClass = this.toObject()
    cClass.dayName = this.getDayName()
    return cClass
}

classSchema.methods.getDayName = function() {
    return dayNames[this.day]
}

classSchema.methods.updateStatus = async (cClass, newStatus, message) => {

    try {
        if (!getStatusTypes().includes(newStatus) || (newStatus==status.CUSTOM && message==undefined)) {
            return false
        }
        cClass.status = newStatus
        if (newStatus==status.CUSTOM) {
            cClass.message = message
        }
        else {
            cClass.message = statusTypes.get(newStatus)
        }
        await cClass.save()
        return true
    } catch (err) {
        return false
    }
}