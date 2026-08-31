import { z } from "zod";

export const ticketTypeSchema = z.enum([
  "bug",
  "feature_request",
  "improvement",
  "support",
  "quote_request",
]);

export const ticketPrioritySchema = z.enum([
  "low",
  "medium",
  "high",
  "critical",
]);

export const ticketSourceSchema = z.enum([
  "email",
  "meeting",
  "onboarding",
  "phone",
  "customer",
]);

export const ticketSchema = z.object({
  id: z.number().int().positive(),
  createdById: z.number().int().positive(),

  type: ticketTypeSchema,
  priority: ticketPrioritySchema,

  title: z.string().min(1).max(255),
  description: z.string().min(1),

  source: ticketSourceSchema.optional(),

  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const createTicketSchema = ticketSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const ticketingFormSchema = z.object({
  tickets: z.array(createTicketSchema),
});

export type TicketingForm = z.infer<typeof ticketingFormSchema>;
export type CreateTicket = z.infer<typeof createTicketSchema>;
export type Ticket = z.infer<typeof ticketSchema>;
