import * as z from "zod";

export const signinSchema = z.object({
  email: z.email({ error: "Required field!" }),
  password: z.string().nonempty("Required field!"),
});

export type signinSchemaType = z.infer<typeof signinSchema>;
