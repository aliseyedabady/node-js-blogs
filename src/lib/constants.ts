const jwtSecret = process.env.JWT_SECRET || "secretKey";
const jwtExpiresIn = "1h";
const jwtRefreshExpiresIn = "1h";
const saltRounds = 10;

export { jwtSecret, saltRounds, jwtExpiresIn, jwtRefreshExpiresIn };
