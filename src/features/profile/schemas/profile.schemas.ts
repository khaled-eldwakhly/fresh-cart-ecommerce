import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z
    .string()
    .nonempty("Required field!")
    .min(3, "Name must be at least 3 characters!")
    .max(60, "Name must be not exceed 60 characters!"),
  email: z.email({ error: "Required field!" }),
  phone: z
    .string()
    .nonempty("Required field!")
    .regex(/^(010|011|012|015)[0-9]{8}$/, {
      message: "Number must be a valid Egyptian number",
    }),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Enter current password!"),
    password: z
      .string()
      .nonempty("Enter a new password!")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain uppercase, lowercase, number, and special character (min 8 chars)",
      ),
    rePassword: z.string().nonempty("Confirm new password!"),
  })
  .refine((d) => d.password === d.rePassword, {
    message: "Password and Re-password must be the same",
    path: ["rePassword"],
  });

export type UpdateProfileType = z.infer<typeof updateProfileSchema>;
export type ChangePasswordType = z.infer<typeof changePasswordSchema>;
