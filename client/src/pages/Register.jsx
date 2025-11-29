import React from "react";

import { useActionState, useState } from "react";
import * as z from "zod";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";



const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // ⭐ SCHEMA (outside the component)
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

  // ⭐ SAFE submitHandler
  const submitHandler = async (prevState, formData) => {
    const backendUrl = import.meta.env.VITE_SERVER_URL;

    // const userData = {
    //   username: formData.get("username"),
    //   email: formData.get("email"),
    //   password: formData.get("password"),
    // };

    // ⭐ ZOD VALIDATION (uncrashable)
    try {
      UserSchema.parse(userData);
    } catch (err) {
      console.log("RAW ZOD ERROR:", err);

      const errors = {};

      // 🟢 CASE 1 → ZodError.issues exists
      if (Array.isArray(err.issues)) {
        err.issues.forEach((issue) => {
          errors[issue.path[0]] = issue.message;
        });
        return { errors };
      }

      // 🟢 CASE 2 → ZodError.errors exists
      if (Array.isArray(err.errors)) {
        err.errors.forEach((issue) => {
          errors[issue.path[0]] = issue.message;
        });
        return { errors };
      }

      // 🟡 CASE 3 → Unexpected format
      return { error: "Validation failed unexpectedly." };
    }

    // ⭐ API CALL (safe)
    try {
      const res = await axios.post(`${backendUrl}/api/register`, userData);
      return { success: true, data: res.data };
    } catch (error) {
      return { error: "Server error. Please try again later.", msg: error };
    }
  };

  const [state, formAction, isPending] = useActionState(submitHandler, {});


  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(userData);
  };

  return (
    <div
      className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950
      bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"
    >
      <div className="flex justify-center items-center min-h-screen text-white">
        <div className="flex flex-col gap-3 w-80">
          <h3 className="text-xl font-bold mb-4">Register Form</h3>

          {/* ⭐ data-static fixes Vite corruption */}
          <form action={formAction} data-static className="flex flex-col gap-4">
            {/* USERNAME */}
            <TextField
              name="username"
              label="Username"
              value={userData.username}
              onChange={(e) => {
                handleChange(e);
              }}
              sx={{
                input: { color: "white" },
                label: { color: "white" },
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              }}
            />
            {state?.errors?.username && (
              <p className="text-red-400 text-sm">{state.errors.username}</p>
            )}

            {/* EMAIL */}
            <TextField
              name="email"
              label="Email"
              value={userData.email}
              onChange={(e) => {
                handleChange(e);
              }}
              sx={{
                input: { color: "white" },
                label: { color: "white" },
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              }}
            />
            {state?.errors?.email && (
              <p className="text-red-400 text-sm">{state.errors.email}</p>
            )}

            {/* PASSWORD */}
            <TextField
              name="password"
              type="password"
              label="Password"
              value={userData.password}
              onChange={(e) => {
                handleChange(e);
              }}
              sx={{
                input: { color: "white" },
                label: { color: "white" },
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              }}
            />
            {state?.errors?.password && (
              <p className="text-red-400 text-sm">{state.errors.password}</p>
            )}

            {/* SUBMIT */}
            <Button type="submit" variant="contained" disabled={isPending}>
              {isPending ? "Loading..." : "Register"}
            </Button>
          </form>
          {<h1>{userData.username}</h1>}
          {/* SUCCESS / ERROR */}
          {state?.success && (
            <p className="text-green-400 text-sm mt-2">
              Registered successfully 🎉
            </p>
          )}

          {state?.error && (
            <p className="text-red-400 text-sm mt-2">{state.error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
