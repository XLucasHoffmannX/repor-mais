import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z
    .string()
    .min(6, 'Senha deve possuir 6 ou mais caracteres')
    .refine(value => /.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*/.test(value), {
      message: 'Senha deve conter pelo menos 1 símbolo especial'
    })
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
