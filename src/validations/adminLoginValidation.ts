import { checkSchema } from "express-validator";

export const AdminLoginValidation = checkSchema({
  username: {
    notEmpty: {
      errorMessage: "نام کاربری اجباری است",
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
});
