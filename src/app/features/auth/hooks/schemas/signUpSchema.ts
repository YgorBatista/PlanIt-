import z from "zod";

export const formSchema = z
    .object({
        name: z.string().min(2, 'O nome deve ter mais de 2 caracteres').max(20, 'O nome deve ter no  máximo 20 caracteres.'),
        email: z.string().email('Formato inválido').min(1).max(50),
        password: z
            .string()
            .min(6, 'A senha deve ter mais de 6 caracteres')
            .max(40, 'a senha deve ter no maximo 40 carateres')
            .regex(/[a-z]/, 'a senha deve conter letra minuscula')
            .regex(/[A-Z]/, 'a senha deve conter letra maiuscula'),
        confirmPassword: z.string()
    })
    .refine(data => data.password === data.confirmPassword, {
        message: 'As senhas não coincidem',
        path: ['confirmPassword']
    });

    export type SignUpFormData = z.infer<typeof formSchema>;