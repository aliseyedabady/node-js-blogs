const jwtSecret = process.env.JWT_SECRET || "secretKey";
const jwtExpiresIn = "1h";
const jwtRefreshExpiresIn = "1h";
const saltRounds = 10;
const translateErrorMessage = "Translation not available";

export {
  jwtSecret,
  saltRounds,
  jwtExpiresIn,
  jwtRefreshExpiresIn,
  translateErrorMessage,
};
