import { z } from "zod";
export const quoteSchema = z.object({
  name: z.string().min(2).max(80),
  company: z.string().max(100).optional(),
  contact: z.string().min(5).max(120),
  service: z.string().min(2).max(80),
  message: z.string().min(10).max(2000),
  website: z.string().max(0).optional().default(""),
});
export type QuoteInput = z.infer<typeof quoteSchema>;
