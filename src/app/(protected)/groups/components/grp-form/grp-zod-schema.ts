import { z } from "zod";

export const GroupFormSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  users: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .array()
    .min(2, "Group should have atleast 2 users"),
});

export type GroupFormData = z.infer<typeof GroupFormSchema>;
