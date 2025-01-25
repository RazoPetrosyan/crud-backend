import Joi from 'joi';

const schema = {
  createUser: Joi.object({
    userName: Joi.string()
      .trim()
      .min(6)
      .regex(/^[a-zA-Z][a-zA-Z0-9]*$/)
      .required()
      .messages({
        'string.empty': 'UserName must not be empty',
        'string.pattern.base': 'UserName must start with a letter and contain only Latin letters and numbers. Minimum 6 Symbols',
        'any.required': 'UserName is required',
      }),

    email: Joi.string()
      .email()
      .trim()
      .lowercase()
      .required()
      .messages({
        'string.empty': 'Email must not be empty',
        'string.email': 'Email must be a valid email address.',
        'any.required': 'Email is required',
      }),

    password: Joi.string()
      .trim()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};:"|,.<>/?]).{8,}$/)
      .required()
      .messages({
        'string.empty': 'Password must not be empty',
        'string.min': 'The password must contain a minimum of 8 characters',
        'string.pattern.base': 'The password must contain a minimum of 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character',
        'any.required': 'Password is required',
      }),
  }),
  login: Joi.object({
    email: Joi.string()
      .email()
      .trim()
      .lowercase()
      .required()
      .messages({
        'string.empty': 'Email must not be empty',
        'string.email': 'Email must be a valid email address.',
        'any.required': 'Email is required',
      }),
    password: Joi.string()
      .required()
      .messages({
        'string.empty': 'Password must not be empty',
      }),
  }),
  resetPassword: Joi.object({
    email: Joi.string()
      .email()
      .trim()
      .lowercase()
      .required()
      .messages({
        'string.empty': 'Email must not be empty',
        'string.email': 'Email must be a valid email address.',
        'any.required': 'Email is required',
      }),
  }),
  resetPasswordFinished: Joi.object({
    password: Joi.string()
      .trim()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};:"|,.<>/?]).{8,}$/)
      .required()
      .messages({
        'string.empty': 'Password must not be empty',
        'string.min': 'The password must contain a minimum of 8 characters',
        'string.pattern.base': 'The password must contain a minimum of 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character',
        'any.required': 'Password is required',
      }),
  }),
};

export default schema;
