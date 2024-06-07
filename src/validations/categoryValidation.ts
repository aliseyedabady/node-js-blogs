import { body } from "express-validator";
import { checkUnique } from "../lib/utils";
import { Category } from "../models";

export const categoryValidation = [
  body("title")
    .isString()
    .withMessage((_, { req }) => req.__("Title required"))
    .custom(async (value, { req }) => {
      await checkUnique({
        value,
        model: Category,
        key: "title",
        message: req.__("Title already in use"),
      });
    }),
];
