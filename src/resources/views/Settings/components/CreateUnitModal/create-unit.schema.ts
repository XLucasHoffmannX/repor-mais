import { z } from 'zod';

export const createUnitSchema = z.object({
  name: z
    .string()
    .min(1, 'Campo obrigatório')
    .max(30, 'Máximo de 30 caracteres')
});

export type CreateUnitySchemaType = z.infer<typeof createUnitSchema>;
