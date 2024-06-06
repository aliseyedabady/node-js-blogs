import { body } from "express-validator";

export const adminLoginValidation = [
  body("username")
    .isString()
    .withMessage((_, { req }) => req.__("Username required")),
  body("password")
    .isString()
    .withMessage((_, { req }) => req.__("Password required"))
    .isLength({ min: 6, max: 32 })
    .withMessage((_, { req }) => req.__("Password length")),
];
