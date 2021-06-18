const { check } = require('express-validator');


const postProfile = () => [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty()
];

const putProfileExperience = () => [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
];

const putProfileEducation = () => [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldOfStudy', 'Field of study is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
];


module.exports = {
    postProfile,
    putProfileExperience,
    putProfileEducation
};
