const jwtSecret = process.env.JWT_SECRET || "secretKey";
const jwtExpiresIn = "1h";

export { jwtSecret, jwtExpiresIn };
