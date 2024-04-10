import { z } from 'zod'

const envSchema = z.object({
  REACT_APP_API_URL: z.string().url(),
  REACT_APP_API_KEY: z.string().uuid(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  throw new Error('Invalid environment variables')
}

export const env = _env.data
