import { checkSchema } from "express-validator";
import { User } from "../models";
import { checkUnique } from "../lib/utils";

export const UserValidator = checkSchema({
  username: {
    notEmpty: {
      errorMessage: "نام کاربری اجباری است",
    },
    custom: {
      options: async value => {
        await checkUnique({
          value,
          model: User,
          key: "username",
          message: "نام کاربری تکراری است",
        });
      },
    },
  },
  password: {
    notEmpty: {
      errorMessage: "رمز عبور اجباری است",
    },
    isLength: {
      options: {
        min: 4,
        max: 36,
      },
      errorMessage: "نام کاربری حداقل ۴ کاراکتر و حداکثر ۳۶ کاراکتر می باشد",
    },
  },
  name: {
    notEmpty: {
      errorMessage: "نام اجباری است",
    },
  },
  email: {
    notEmpty: {
      errorMessage: "ایمیل اجباری است",
    },
    isEmail: {
      errorMessage: "ایمیل صحیح نیست",
    },
    custom: {
      options: async value => {
        await checkUnique({
          value,
          model: User,
          key: "email",
          message: "ایمیل تکراری است",
        });
      },
    },
  },
});
