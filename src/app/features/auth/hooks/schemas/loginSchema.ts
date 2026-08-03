import z from "zod";

export const loginSchema = z.object({
    email: z.string().email('Formato inválido').min(1).max(50),
    password: z
        .string()
        .min(6, 'A senha deve ter mais de 6 caracteres')
        .max(40, 'a senha deve ter no maximo 40 carateres')
        .regex(/[a-z]/, 'a senha deve conter letra minuscula')
        .regex(/[A-Z]/, 'a senha deve conter letra maiuscula')
});

export type LoginFormData = z.infer<typeof loginSchema>;