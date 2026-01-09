'use client';

import { useState } from "react";
import { Eye, EyeClosed, BookOpen} from 'lucide-react';
import style from './style.module.css';
import { AuthLoginDTO } from "@/types/AuthType";
import AuthService from "@/services/AuthService";
import { authLoginSchema } from "@/schemas/AuthSchema";
import { ZodError } from "zod";
import { toast } from "react-toastify";

export default function AuthCard(){
    const [seePassword, setSeePassword] = useState<boolean>(false);
    const [payload, setPayload] = useState<AuthLoginDTO>({auth: {email: '', password: ''}});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const validateForm = (data: AuthLoginDTO) => {
        try {
            authLoginSchema.parse(data);
            setErrors({});
            setIsValid(true);
        } catch (error) {
            if (error instanceof ZodError) {
            const fieldErrors: Record<string, string> = {};

            error.issues.forEach(err => {
                fieldErrors[err.path.join(".")] = err.message;
            });

            setErrors(fieldErrors);
            setIsValid(false);
            }
        }
    };

    const login = async (payload: AuthLoginDTO) => {

        if (!isValid || loading) return;

        try{
            setLoading(true);

            const data = await AuthService.login(payload);

            if (data) toast.success("Login realizado com sucesso!");
            console.log(data);
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message || "Erro ao realizar login"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={style.card}>
            <div className={style.card_header}>
                <div className={style.card_circle}>
                    <BookOpen color="#FFF" size={32}/>
                </div>

                <div className={style.card_header_text}>
                    <h3>Book Store</h3>
                    <span>Entre na sua conta</span>
                </div>
            </div>

            <div className={style.card_body}>
                <div className={style.card_input}>
                    <label>Email</label>
                    <input type="text" placeholder="seu@email.com" onChange={(e) => {const updatedPayload = {auth: {...payload.auth,email: e.target.value}}; setPayload(updatedPayload); validateForm(updatedPayload)}}/>
                </div>

                {errors['auth.email'] && <span className={style.error_message}>{errors['auth.email']}</span>}

                <div className={style.card_input}>
                    <label>Senha</label>
                    <input type={seePassword ? "text" : "password"} placeholder="sua senha" onChange={(e) => {const updatedPayload = {auth: {...payload.auth,password: e.target.value}}; setPayload(updatedPayload); validateForm(updatedPayload)}}/>
                    {seePassword ?
                        <EyeClosed color="#FF6D00" className={style.icon_view} onClick={() => setSeePassword(!seePassword)}/>
                        :
                        <Eye color="#FF6D00" className={style.icon_view} onClick={() => setSeePassword(!seePassword)}/>
                    }
                </div>

                {errors['auth.password'] && <span className={style.error_message}>{errors['auth.password']}</span>}

                <button className={style.signin} disabled={!isValid || loading} onClick={() => login(payload)}>Entrar</button>

                <p>Não tem uma conta? <a href="/register">Cadastre-se</a></p>
            </div>

            <div className={style.card_login_info}>
                <h4>Logado no nosso sistema</h4>

                <ol>
                    <li>Tenha acesso ao carrinho de compras</li>
                    <li>Gerencie seus pedidos</li>
                    <li>Receba ofertas exclusivas</li>
                    <li>Deixe sua experiência mais completa</li>
                </ol>
            </div>

            <p className={style.card_footer}>© 2024 Book Store. Todos os direitos reservados.</p>
        </div>
    );
}