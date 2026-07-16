import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Please enter your full name").max(120),
  phone: z.string().min(7, "Please enter a valid phone number").max(25),
  email: z.string().email("Please enter a valid email address"),
  address: z.string().min(4, "Please enter the property address").max(200),
  city: z.string().min(2).max(80),
  province: z.string().min(2).max(40),
  postalCode: z
    .string()
    .regex(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/, "Please enter a valid Canadian postal code"),
  propertyType: z.enum([
    "Detached house",
    "Semi-detached",
    "Townhouse",
    "Condo",
    "Duplex / multi-family",
    "Vacant land",
    "Other",
  ]),
  condition: z.enum(["Move-in ready", "Needs minor work", "Needs major work", "Uninhabitable"]),
  timeline: z.enum(["As soon as possible", "Within 1 month", "1–3 months", "3+ months", "Just exploring"]),
  reason: z.string().min(2).max(120),
  notes: z.string().max(2000).optional().or(z.literal("")),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please confirm you agree to be contacted" }),
  }),
  sourcePath: z.string().max(300).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

/** Short-form variant: address + phone only. Everything else is gathered on
 *  the follow-up call. Converts far better with older sellers. */
export const quickLeadSchema = z.object({
  quick: z.literal(true),
  phone: z.string().min(7, "Please enter a valid phone number").max(25),
  address: z.string().min(4, "Please enter the property address").max(200),
  city: z.string().max(80).optional().or(z.literal("")),
  province: z.string().max(40).optional().or(z.literal("")),
  sourcePath: z.string().max(300).optional(),
});

export type QuickLeadInput = z.infer<typeof quickLeadSchema>;

export const propertyTypes = leadSchema.shape.propertyType.options;
export const conditions = leadSchema.shape.condition.options;
export const timelines = leadSchema.shape.timeline.options;
export const sellingReasons = [
  "Inherited a property",
  "Divorce or separation",
  "Behind on payments / foreclosure",
  "Relocating",
  "Downsizing",
  "Tired landlord / tenant issues",
  "Property needs too many repairs",
  "Vacant property",
  "Other",
];
