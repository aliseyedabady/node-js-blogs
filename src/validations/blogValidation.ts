import { body } from "express-validator";
import { checkExist, checkUnique } from "../lib/utils";
import { Blog, Category } from "../models";

export const blogValidation = [
  body("title")
    .isString()
    .withMessage((_, { req }) => req.__("Title required")),
  body("slug")
    .isString()
    .withMessage((_, { req }) => req.__(""))
    .custom(async (value, { req }) => {
      await checkUnique({
        value,
        model: Blog,
        key: "slug",
        message: req.__("Slug already in use"),
      });
    }),
  body("category_id")
    .isString()
    .custom(async (id, { req }) => {
      await checkExist({
        id,
        model: Category,
        message: req.__("Category not found"),
      });
    }),
  body("description")
    .isString()
    .withMessage((_, { req }) => req.__("Description required")),
  body("content")
    .isString()
    .withMessage((_, { req }) => req.__("Content required")),
];
