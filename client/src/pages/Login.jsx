import React from "react";
import { useState, useActionState } from "react";
import Box from "@mui/material/Box";
import * as z from "zod";
import { Button } from "@mui/material";
import axios from "axios";

import TextField from "@mui/material/TextField";

const Login = () => {
  const [email, setEmail] = useState(true);

  const UserSchema = z.object({
    username: z
      .string({
        invalid_type_error:
          "Username must be text, not a number or other value.",
      })
      .min(3, "Username must be at least 3 characters long.")
      .regex(
        /^[a-zA-Z\s]+$/,
        "Username must contain only letters and spaces, no numbers or special characters."
      ),

    email: z
      .string({ invalid_type_error: "Email must be a text string." })
      .includes(
        "@",
        "Please ensure the email includes the '@' symbol for a valid format."
      ),

    password: z
      .string({ invalid_type_error: "Password must be a text string." })
      .min(6, "Password is too short. It must be 6 characters or longer.")
      .max(50, "Password is too long, keep it under 50 characters."),
  });

  const submitHandler = async () => {
    // const res = axios.post()
    const backendUrl = import.meta.env.VITE_SERVER_URL;

    console.log(userData); // works 🎉
    let validatedData;
    try {
      validatedData = UserSchema.parse(userData);
    } catch (err) {
      console.log(err);
       const errors = {};

       // 🟢 CASE 1 → ZodError.issues exists
       if (Array.isArray(err.issues)) {
         err.issues.forEach((issue) => {
           errors[issue.path[0]] = issue.message;
         });
         console.log("here i am returning error of this shit thing", errors);

         return { errors };
       }

       // 🟢 CASE 2 → ZodError.errors exists
       if (Array.isArray(err.errors)) {
         err.errors.forEach((issue) => {
           errors[issue.path[0]] = issue.message;
         });
         console.log("here i am returning error of this shit thing", errors);

         return { errors };
       }
    }
    

    axios
      .post(`${backendUrl}/api/login`, {
        validatedData,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    username: "", 
  });

  const [state, formAction, isPending] = useActionState(submitHandler, {});

  return (
    <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className=" flex justify-center items-center min-h-screen text-white ">
        <div className=" flex flex-col h-96  gap-3">
          <div className="text-xl font-bold">
            {" "}
            <h3>Login Form</h3>
          </div>

          <div className="form"></div>

          <form action={formAction}>
            {email ? (
              <>
                // if email is true
                <TextField
                  name="email"
                  value={userData.email}
                  onChange={(e) => {
                    changeHandler(e);
                  }}
                  id="outlined-multiline-flexible"
                  label="Email"
                  multiline
                  maxRows={2}
                  sx={{
                    "& .MuiInputBase-input": { color: "white" },
                    "& .MuiInputLabel-root": { color: "white" },
                    "& .MuiInputLabel-root.Mui-focused": { color: "white" },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "white",
                      },
                  }}
                />
                {state?.errors?.email && (
                  <p className="text-red-400 text-sm">{state.errors.email}</p>
                )}
              </>
            ) : (
              // if email is false
              <>
                <TextField
                  name="username"
                  value={userData.username}
                  onChange={(e) => {
                    changeHandler(e);
                  }}
                  id="outlined-multiline-flexible"
                  label="Username"
                  multiline
                  maxRows={2}
                  sx={{
                    "& .MuiInputBase-input": { color: "white" },
                    "& .MuiInputLabel-root": { color: "white" },
                    "& .MuiInputLabel-root.Mui-focused": { color: "white" },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "white",
                      },
                  }}
                />
                {state?.errors?.username && (
                  <p className="text-red-400 text-sm">
                    {state.errors.username}
                  </p>
                )}
              </>
            )}
            <TextField
              name="password"
              value={userData.password}
              onChange={(e) => {
                changeHandler(e);
              }}
              id="outlined-multiline-flexible"
              label="Password"
              multiline
              maxRows={4}
              sx={{
                "& .MuiInputBase-input": { color: "white" },
                "& .MuiInputLabel-root": { color: "white" },
                "& .MuiInputLabel-root.Mui-focused": { color: "white" },
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "white",
                  },
              }}
            />
            <Button variant="contained" type="submit">
              Send
            </Button>
          </form>

          <div>
            <button
              onClick={() => {
                // logic of clearning out
                // email
                //   ? setUserData((prev) => ({ ...prev, username: " " }))
                //   : setUserData((prev) => ({ ...prev, email: " " }));
                setEmail(!email);
              }}
            >
              {email ? "Login With username" : "Login With email"}
            </button>
            <h2>email : {userData.username}</h2>
            <h2>email : {userData.email}</h2>
            <h2> password: {userData.password}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
