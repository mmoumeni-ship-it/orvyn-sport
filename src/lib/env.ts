import { z } from 'zod';

const clientEnvSchema = z.object({
  VITE_STRIPE_PUBLISHABLE_KEY: z.string().startsWith('pk_', 'Invalid Stripe publishable key'),
  VITE_GA_MEASUREMENT_ID: z.string().optional(),
  VITE_SENTRY_DSN: z.string().url().optional(),
});

const serverEnvSchema = z.object({
  STRIPE_SECRET_KEY: z.string().startsWith('sk_', 'Invalid Stripe secret key').optional(),
  GEMINI_API_KEY: z.string().optional(),
  APP_URL: z.string().url().optional(),
});

function validateClientEnv() {
  const result = clientEnvSchema.safeParse(import.meta.env);
  if (!result.success) {
    const missing = result.error.issues.map((i) => i.message).join(', ');
    console.warn(`[env] Client env validation warning: ${missing}`);
    return {} as z.infer<typeof clientEnvSchema>;
  }
  return result.data;
}

export const clientEnv = validateClientEnv();

export function validateServerEnv(vars: Record<string, string | undefined>) {
  const result = serverEnvSchema.safeParse(vars);
  if (!result.success) {
    const missing = result.error.issues.map((i) => i.message).join(', ');
    console.warn(`[env] Server env validation warning: ${missing}`);
  }
  return result.success ? result.data : ({} as z.infer<typeof serverEnvSchema>);
}
