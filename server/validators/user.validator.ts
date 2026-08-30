import { z } from 'zod';

const trimString = (val: unknown) => (typeof val === 'string' ? val.trim() : val);

export const SignupSchema = z
  .object({
    name: z.preprocess(trimString, z.string().min(1, 'Name is required').max(100, 'Name is too long')),
    email: z.preprocess(
      (val) => (typeof val === 'string' ? val.trim().toLowerCase() : val),
      z.string().email('Invalid email format').max(254, 'Email is too long')
    ),
    phone: z.preprocess((val) => {
      if (typeof val !== 'string') return val;
      let text = val.trim();
      if (text.startsWith('+91')) {
        text = text.slice(3);
      } else if (/^91[\s\-\.]/.test(text)) {
        text = text.slice(2);
      } else if (/^91\d{10}$/.test(text)) {
        text = text.slice(2);
      }
      return text.replace(/\D/g, '');
    }, z.string().regex(/^\d{10}$/, 'Phone number must be exactly 10 digits')),
    countryCode: z.preprocess(trimString, z.string().max(10).default('+91')),
    timezone: z.preprocess(trimString, z.string().max(50).default('Asia/Kolkata')),
    profession: z.preprocess(trimString, z.string().max(100).optional()),
    city: z.preprocess(trimString, z.string().min(1, 'City is required').max(100, 'City is too long')),
    route: z.preprocess(trimString, z.string().min(1, 'Route is required').max(500, 'Route is too long')),
    monthlyPowerBill: z.preprocess(
      (val) => {
        if (typeof val === 'string') {
          const trimmed = val.trim();
          return trimmed === '' ? undefined : trimmed;
        }
        return val;
      },
      z.string().regex(/^\d{1,7}$/, 'Invalid bill amount').optional()
    ),
    utm_source: z.preprocess(trimString, z.string().max(200).optional()),
    utm_medium: z.preprocess(trimString, z.string().max(200).optional()),
    utm_campaign: z.preprocess(trimString, z.string().max(200).optional()),
    utm_content: z.preprocess(trimString, z.string().max(200).optional()),
    utm_term: z.preprocess(trimString, z.string().max(200).optional()),
    platform: z.preprocess(trimString, z.string().max(200).optional()),
    gclid: z.preprocess(trimString, z.string().max(200).optional()),
    fbclid: z.preprocess(trimString, z.string().max(200).optional()),
    fbp: z.preprocess(trimString, z.string().max(200).optional()),
    fbc: z.preprocess(trimString, z.string().max(200).optional()),
    matchtype: z.preprocess(trimString, z.string().max(200).optional()),
    network: z.preprocess(trimString, z.string().max(200).optional()),
    device: z.preprocess(trimString, z.string().max(200).optional()),
    keyword: z.preprocess(trimString, z.string().max(200).optional()),
    placement: z.preprocess(trimString, z.string().max(200).optional()),
    campaignid: z.preprocess(trimString, z.string().max(200).optional()),
    adgroupid: z.preprocess(trimString, z.string().max(200).optional()),
  })
  .strict();

export const UserDetailsQuerySchema = z
  .object({
    range: z.enum(['today', 'yesterday', '7days', '1month', 'custom']).default('today'),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    page: z.string().regex(/^\d+$/).default('1').transform(Number),
    limit: z.string().regex(/^\d+$/).default('10').transform(Number),
  })
  .refine(
    (data) => {
      if (data.range === 'custom') {
        return !!data.startDate && !!data.endDate;
      }
      return true;
    },
    {
      message: "startDate and endDate are required when range is 'custom'",
      path: ['range'],
    }
  );
