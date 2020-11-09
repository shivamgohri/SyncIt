/**
 * @author Shivam Gohri
 * @email shivamgohri93@gmail.com
 * @create date 09-11-202020 51:35:23
 * @modify date 09-11-202020 51:35:23
 * @desc [description]
 */
const College = require('../models/college/college')

const getCollegesSortedByName = async (pageNumber, perPage, order = 1) => {
    return College
            .find({})
            .skip(perPage * (pageNumber - 1))
            .limit(perPage)
            .sort({ name: order })
            .exec()
}

const getCollegesSortedByCity = async (pageNumber, perPage, order = 1) => {
    return College
            .find({})
            .skip(perPage * (pageNumber - 1))
            .limit(perPage)
            .sort({ city: order })
            .exec()
}

const getCollegesSortedByState = async (pageNumber, perPage, order = 1) => {
    return College
            .find({})
            .skip(perPage * (pageNumber - 1))
            .limit(perPage)
            .sort({ state: order })
            .exec()
}

const getCollegesSortedByCountry = async (pageNumber, perPage, order = 1) => {
    return College
            .find({})
            .skip(perPage * (pageNumber - 1))
            .limit(perPage)
            .sort({ country: order })
            .exec()
}

module.exports = {
    getCollegesSortedByName,
    getCollegesSortedByCity,
    getCollegesSortedByState,
    getCollegesSortedByCountry
}