import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
    
    const Secret = process.env.ACCESS_TOKEN_SECRET;
    const token = req.cookies.token; // read from cookie

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "nahi bhai nahi ho payega",
      });
    }

    try {
      const decoded = jwt.verify(token, Secret);

      console.log("verifying token ", decoded);
      req.user = decoded;

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
        error,
      });
    }
 }