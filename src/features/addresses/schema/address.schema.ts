import * as z from "zod";

export const addressSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters!")
    .max(50, "Name is too long!")
    .regex(
      /^[\p{L}\p{M}]+(?:[ '-][\p{L}\p{M}]+)+$/u,
      "Enter your full name (letters only)!",
    ),

  phone: z
    .string()
    .trim()
    .regex(/^(?:\+20|0020|0)?1[0125]\d{8}$/, "Enter phone number!"),

  details: z
    .string()
    .trim()
    .min(10, "Address details is too short!")
    .max(200, "Address details is too long!")
    .regex(
      /^[\p{L}\p{M}\p{N}\s,.\-/#()،]+$/u,
      "Address contains invalid characters!",
    ),

  city: z.string().min(1, "Please select a city!"),
});

export type addressSchemaType = z.infer<typeof addressSchema>;
