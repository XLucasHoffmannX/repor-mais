import { z } from 'zod';

export const withdrawSchema = z.object({
  productId: z.string({ required_error: 'Selecione um produto.' }),
  reason: z.string().optional(),
  quantity: z
    .number({ required_error: 'A quantidade é obrigatória.' })
    .positive('A quantidade deve ser maior que zero.')
});

export type WithdrawFormDataType = z.infer<typeof withdrawSchema>;
