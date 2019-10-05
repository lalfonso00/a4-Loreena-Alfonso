const { check } = require('express-validator');
const { query } = require('express-validator');
const validator = require('validator');

const powersCheck = (value) => {
    //console.log(Array.isArray(value))
    return Array.isArray(value)
};


const powersSanitizer = (powersValue) => {
    if (Array.isArray(powersValue)) {
        let newValues = powersValue.map((element) => {
            return validator.escape(element);
        });
        return newValues
    }
};


exports.heroesValidators = [
    //validatiors for inputs will go here 
    check('name', 'Please enter a valid name.')
    .trim()
    .not().isEmpty()
    .escape()
    .isLength({ min: 1, max: 30 })
    //check to make sure length is within a range, its the right type
    ,

    check('email', 'Please enter a valid email.')
    .trim()
    .not().isEmpty()
    .escape()
    .isEmail()

    ,
    check('powers', 'Please check at least two powers')
    .custom(powersCheck)
    .customSanitizer(powersSanitizer)

];

exports.colorsValidators = [
    query('color', 'Please enter a valid color')
    .isHexColor()
    .escape()

];
