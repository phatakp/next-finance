import { z } from "zod";

const UserSchema = z
  .object({
    value: z.string(),
    label: z.string(),
  })
  .array()
  .min(2, "Group should have min 2 users");

export const GroupFormSchema = z.object({
  id: z.string().optional(),
  action: z.enum(["add", "update", "delete"]),
  name: z.string(),
  users: UserSchema,
});
