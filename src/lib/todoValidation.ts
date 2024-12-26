import { z } from 'zod';

export const todoSchema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().nonempty("Description is required"),
  dueDate: z.string().nonempty("Due date is required").refine((date) => !isNaN(new Date(date).getTime()), {
    message: "Invalid date format",
  }),
  status: z.boolean().default(false), // Ensure the default is false
});

export type TodoInput = z.infer<typeof todoSchema>;
