import { z } from 'zod';

export const authLoginSchema = z.object({
    auth: z.object({
        email: z.email({ message: "Email inválido" }),
        password: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
    }),
});

export const authRegisterSchema = z.object({
    auth: z.object({
        name: z.string().min(3, { message: "O nome deve ter no mínimo 3 caracteres" }),
        username: z.string().min(3, { message: "O nome de usuário deve ter no mínimo 3 caracteres" }),
        email: z.email({ message: "Email inválido" }),
        password: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
    }),
});

export type AuthLoginSchema = z.infer<typeof authLoginSchema>;
export type AuthRegisterSchema = z.infer<typeof authRegisterSchema>;