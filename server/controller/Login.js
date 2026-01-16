  import User from "../models/user.model.js";
  import bcrypt from "bcrypt"
import { generateAccessToken } from "../utils/token.js";

  export const loginUser = async (req, res) => {
    console.log("login route");
    const {
      username = null,
      email = null,
      password,
    } = await req.body.validatedData;
    console.log("email:", email, "password:", password);

    let user;

    if (email) {
      user = await User.findOne({ email });
    } else if (username) {
      user = await User.findOne({ username });
    }

    if (!user) {
      return res.status(403).json({
        success: false,
        field: email ? "email" : "username",
        message: "User not found",
      });
    }

    const hashedPassword = user.password;
    console.log("User found, checking password...");

    // check Password is correct or not
    
      const validation = bcrypt.compareSync(password, hashedPassword); 
      console.log(validation)

      if(validation){

        const accessToken = generateAccessToken(user);
        console.log("token" , accessToken)

        //generate jwt

        res.cookie("token", accessToken, {
          httpOnly: true,
          secure: false, // Set to true in production with HTTPS
          sameSite: "Lax", // Use "None" with secure: true for cross-origin in production
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });


        return res.status(200).json({
          accessToken,
          success: true,
          message: "jwt generate kardega mai",
        });


      }
      else {
        return res.status(404).json({
          success: false,
          field: email ? "email" : "username",
          message: "password wrong bhau",
        });
      }
  };


   
export const verifyToken = async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user, // decoded user info
  });
};
