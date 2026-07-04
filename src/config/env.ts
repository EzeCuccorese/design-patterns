import { z } from 'zod';

const envSchema = z.object({
  VITE_APP_TITLE: z.string().min(1, 'El título de la aplicación no puede estar vacío').default('Patrones de Diseño'),
  VITE_DEV_MODE: z.enum(['development', 'production', 'test']).default('development'),
  VITE_API_URL: z.string().url('Debe ser una URL válida').default('https://api.example.com'),
});

export type Env = z.infer<typeof envSchema>;

const validateEnv = (): Env => {
  const result = envSchema.safeParse({
    VITE_APP_TITLE: import.meta.env.VITE_APP_TITLE,
    VITE_DEV_MODE: import.meta.env.VITE_DEV_MODE || import.meta.env.MODE,
    VITE_API_URL: import.meta.env.VITE_API_URL,
  });

  if (!result.success) {
    console.error('❌ Error de validación en variables de entorno:', result.error.format());
    throw new Error('Variables de entorno no válidas. Por favor verifica tu archivo .env');
  }

  return result.data;
};

export const env = Object.freeze(validateEnv());
