import * as z from "zod"

 export const registerSchema = z.object({
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