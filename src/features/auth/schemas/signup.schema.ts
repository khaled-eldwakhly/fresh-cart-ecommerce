import * as z from "zod";

export const signupSchema = z
  .object({
    name: z
      .string()
      .nonempty("Required field!")
      .min(3, "Name must be at least 3 characters!")
      .max(60, "Name must be not exceed 60 characters!"),
    email: z.email({ error: "Required field!" }),
    password: z
      .string()
      .nonempty("Required field!")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain uppercase, lowercase, number, and special character (min 8 chars)",
      ),
    rePassword: z.string().nonempty("Required field!"),
    phone: z
      .string()
      .nonempty("Required field!")
      .regex(/^(010|011|012|015)[0-9]{8}$/, {
        message: "Number must be a valid Egyptian number",
      }),
    terms: z
      .boolean()
      .refine((value) => value === true, { error: "You must accept terms!" }),
  })
  .refine((object) => object.password === object.rePassword, {
    path: ["rePassword"],
    error: "Password and Re-password must be the same",
  });

export type signupSchemaType = z.infer<typeof signupSchema>;
