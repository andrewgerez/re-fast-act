import { z } from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_API_KEY: z.string(),
})

const _env = envSchema.safeParse(import.meta.env)

if (_env.success === false) {
  throw new Error('Invalid environment variables')
}

export const env = _env.data
