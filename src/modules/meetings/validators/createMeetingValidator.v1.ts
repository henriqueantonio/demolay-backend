import { z } from "zod";

async function createMeetingValidatorV1(data: Record<string, any>) {
  return z
    .object({
      description: z.string().min(1).optional(),
      startAt: z
        .preprocess((arg) => {
          if (typeof arg == "string" || arg instanceof Date)
            return new Date(arg);
        }, z.date())
        .refine((val) => val >= new Date(), {
          message: "startAt must be a date after now",
        }),
      endAt: z
        .preprocess((arg) => {
          if (typeof arg == "string" || arg instanceof Date)
            return new Date(arg);
        }, z.date())
        .refine((val) => val >= new Date(), {
          message: "startAt must be a date after now",
        })
        .optional(),
    })
    .refine((val) => (!val.endAt && true) || val.endAt > val.startAt, {
      message: "endAt must be greater than startAt",
    })
    .parseAsync(data);
}

export { createMeetingValidatorV1 };
