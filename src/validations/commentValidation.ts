import { body } from "express-validator";
import { checkExist } from "../lib/utils";
import Comment from "../models/Comment";

export const commentValidation = [
  body("name")
    .isString()
    .withMessage((_, { req }) => req.__("Name required")),
  body("email")
    .isString()
    .withMessage((_, { req }) => req.__("Email is invalid")),
  body("text")
    .isString()
    .withMessage((_, { req }) => req.__("Content required")),
  body("parent_id").custom(async (id, { req }) => {
    await checkExist({
      id,
      model: Comment,
      message: req.__("Comment not found"),
    });
  }),
];
