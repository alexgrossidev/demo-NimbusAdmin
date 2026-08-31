import { z } from "zod";

export const updateItemSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(255, "Title cannot exceed 255 characters"),

  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(5000, "Description is too long"),

  type: z.enum(["bugfix", "feature", "change"]),
});

export const updateOptionsSchema = z.object({
  removeExpiry: z.boolean(),
});

export const updateSchema = z
  .object({
    creationDate: z.coerce.date(),

    expiryDate: z.coerce.date().nullable(),

    items: z
      .array(updateItemSchema)
      .min(1, "At least one update item is required"),

    options: updateOptionsSchema,
  })
  .refine(
    (data) =>
      data.options.removeExpiry ||
      data.expiryDate === null ||
      data.expiryDate >= data.creationDate,
    {
      message: "Expiry date must be after creation date",
      path: ["expiryDate"],
    },
  );

export type Update = z.infer<typeof updateSchema>;
export type UpdateItem = z.infer<typeof updateItemSchema>;
export type UpdateOptions = z.infer<typeof updateOptionsSchema>;
