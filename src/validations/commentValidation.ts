import { body } from "express-validator";
import { checkExist } from "../lib/utils";
import Comment from "../models/Comment";
import { Blog } from "../models";

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
  body("blog_id")
    .isString()
    .withMessage((_, { req }) => req.__(""))
    .custom(async (id, { req }) => {
      await checkExist({
        id,
        model: Blog,
        message: req.__("Blog not found"),
      });
    }),
];
