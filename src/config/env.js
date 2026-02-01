const { z } = require('zod');
const dotenv = require('dotenv');

dotenv.config();

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']),
    PORT: z.coerce.number().positive(),

    RATE_LIMIT_WINDOW_MS: z.coerce.number().positive(),
    RATE_LIMIT_MAX: z.coerce.number().positive(),
    CORS_ORIGIN: z.string().url().or(z.literal('*')),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
    console.error('❌ Invalid environment variables:', _env.error.format());
    process.exit(1);
}

module.exports = _env.data;