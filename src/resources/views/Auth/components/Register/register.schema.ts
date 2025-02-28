import { z } from 'zod';

export const registerSchema = z
  .object({
    email: z
      .string({ required_error: 'Campo obrigatório' })
      .email('Email inválido'),
    name: z.string({ required_error: 'Campo obrigatório' }).max(36),
    password: z
      .string({ required_error: 'Campo obrigatório' })
      .min(6, 'Senha deve possuir 6 ou mais caracteres')
      .refine(
        value => /.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*/.test(value),
        {
          message: 'Senha deve conter pelo menos 1 símbolo especial'
        }
      ),
    confirmPassword: z
      .string({ required_error: 'Campo obrigatório' })
      .min(6, 'Senha deve possuir 6 ou mais caracteres')
      .refine(
        value => /.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*/.test(value),
        {
          message: 'Senha deve conter pelo menos 1 símbolo especial'
        }
      )
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ['confirmPassword'],
        message: 'Senhas não conferem',
        code: z.ZodIssueCode.custom
      });
    }
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;
