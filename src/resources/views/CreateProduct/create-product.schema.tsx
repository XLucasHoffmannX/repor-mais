import { z } from 'zod';

const requiredError = 'Campo obrigatório';

export const createProductSchema = z.object({
  name: z.string({ required_error: requiredError }).max(100),
  description: z.string().optional(),
  barcode: z.string().max(50).optional(),
  category: z.string().max(50).optional(),
  brand: z.string().max(50).optional(),
  supplier: z.string().max(100).optional(),
  costPrice: z.any().optional().nullable(),
  salePrice: z.number({ required_error: requiredError }).optional(),
  stockQuantity: z
    .number({ required_error: requiredError })
    .int({ message: 'A quantidade em estoque deve ser um número inteiro' })
    .default(0),
  minimumStock: z
    .number({ required_error: requiredError })
    .int({ message: 'O estoque mínimo deve ser um número inteiro' })
    .default(0),
  unit: z.string({ required_error: requiredError }).max(20),
  location: z.string().max(100).optional(),
  expirationDate: z.string().optional(), // Assumindo formato "YYYY-MM-DD"
  batch: z.string().max(50).optional()
});

export type CreateProductSchemaType = z.infer<typeof createProductSchema>;
