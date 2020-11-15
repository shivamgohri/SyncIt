/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 15-11-202020 54:18:23
 * @modify date 15-11-202020 54:18:23
 * @desc [description]
 */
const status = {
    CUSTOM: 0,
    ONTIME: 1,
    CANCELLED: 2,
    POSTPONED: 3
}

const statusTypes = new Map()
statusTypes.set(0, "Custom Message")
statusTypes.set(1, "Class ON-TIME")
statusTypes.set(2, "Class CANCELLED")
statusTypes.set(3, "Class POSTPONED")

const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const getStatusTypes = () => {
    return [0, 1, 2, 3]
}

module.exports = {
    status,
    statusTypes,
    getStatusTypes,
    dayNames
}