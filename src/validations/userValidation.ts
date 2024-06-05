import { checkSchema } from "express-validator";

export const UserValidator = checkSchema({
  name: {
    notEmpty: {
      errorMessage: "نام کاربر اجباری است",
    },
  },
  email: {
    notEmpty: {
      errorMessage: "ایمیل اجباری است",
    },
    isEmail: {
      errorMessage: "ایمیل صحیح نمی باشد",
    },
  },
});
