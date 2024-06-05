const jwtSecret = process.env.JWT_SECRET || "secretKey";
const jwtExpiresIn = "1h";
const jwtRefreshExpiresIn = "1h";

export { jwtSecret, jwtExpiresIn, jwtRefreshExpiresIn };
