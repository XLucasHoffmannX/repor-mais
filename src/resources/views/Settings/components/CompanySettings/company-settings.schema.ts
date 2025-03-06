import { z } from 'zod';

const requiredError = 'Campo obrigatório';

export const companySettingsSchema = z.object({
  name: z.string({ required_error: requiredError }).max(60)
});

export type CompanySettingsSchemaType = z.infer<typeof companySettingsSchema>;
