const Joi = require('joi');
const joi = require('joi');

const Schema = Joi.object({
  firstName: Joi.string().required().messages({ 'any.required': 'first name is required field' }),
  lastName: Joi.string().required().messages({ 'any.required': 'last name is required field' }),
  email: Joi.string().required().messages({ 'any.required': 'email is required field' }),
  password: Joi.string().required().messages({ 'any.required': 'password is required field' }),
  dob: Joi.string().required().messages({ 'any.required': 'dob is required field' }),
  contact_no: joi.string().length(10).pattern(/^[0-9]+$/).required().messages({ 'any.required': 'contact_no is required field' }),
  media:joi.string().empty('')

});

module.exports = { Schema };
