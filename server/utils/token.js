import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

// 15 minutes token (industry standard)
export const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
};

// 7 days refresh token
export const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
};

export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch (err) {
    return null; // invalid or expired
  }
};

export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
  } catch (err) {
    return null;
  }
};

export const decodeToken = (token) => {
  return jwt.decode(token);
};