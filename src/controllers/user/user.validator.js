const Joi = require('joi');

export const register = {
  body: {
    firstName: Joi.string().required(),
    userName: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    roleCode: Joi.string().required(),
  },
};

export const login = {
  body: {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string(),
  },
};
