const { check } = require('express-validator');
const { validator } = require('validator');

const powersCheck = (value) => {
    return Array.isArray(value)

};

//Custom sanitizer: Go through each element in the powers array and escape its value. 
//To do this, install the validator module and use its method validator.escape(value).


const powersSanitizer = (value) => {
    value.forEach((element) => {
        element.escape(value);
    });
    return value
}

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
    //.customSanitizer(powersSanitizer)

]
