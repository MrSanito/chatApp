
import bcrypt from "bcrypt";
import User from "../models/user.model.js";

export const registerUser = async (req, res) => {
try {
  const { username, email, password } = await req.body;
  console.log("request body : ", req.body);
  const hashedPassword = await bcrypt.hash(password, 10);

  // email validator
  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ msg: "Email already exists" });
  }

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });


  //returning success
  console.log("User Saved successfully")

  res.status(201).json({
    msg: "User registered successfully 🔥",
    userId: newUser._id,
  });


} catch (error) {
  console.log(error)
   return res.status(500).json({
     msg: "Server error 💀",
     error: error.message,
   });
}
};

