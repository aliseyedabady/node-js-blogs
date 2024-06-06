import { body } from "express-validator";
import { checkUnique } from "../lib/utils";
import { User } from "../models";

export const adminSignupValidation = [
  body("username")
    .isString()
    .withMessage((_, { req }) => req.__("Username required"))
    .custom(async (value, { req }) => {
      await checkUnique({
        value,
        model: User,
        key: "username",
        message: req.__("Username already in use"),
      });
    }),
  body("password")
    .isString()
    .withMessage((_, { req }) => req.__("Password required"))
    .isLength({ min: 6, max: 32 })
    .withMessage((_, { req }) => req.__("Password length")),
  body("email")
    .isString()
    .withMessage((_, { req }) => req.__("Email required"))
    .isEmail()
    .withMessage((_, { req }) => req.__("Email invalid"))
    .custom(async (value, { req }) => {
      await checkUnique({
        value,
        model: User,
        key: "email",
        message: req.__("Email already in use"),
      });
    }),
];
