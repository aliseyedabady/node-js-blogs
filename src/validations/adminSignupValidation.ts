import { checkSchema } from "express-validator";
import knex from "../lib/db";

export const AdminSignupValidation = checkSchema({
  username: {
    notEmpty: {
      errorMessage: "نام کاربری اجباری است",
    },
    custom: {
      options: async value => {
        const user = await knex("users").where({ username: value }).first();
        if (user) {
          return Promise.reject("نام کاربری تکراری است");
        }
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
});
