'use client';

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeClosed, BookOpen } from "lucide-react";
import style from "./style.module.css";

import { AuthLoginDTO, AuthRegisterDTO } from "@/types/AuthType";
import AuthService from "@/services/AuthService";
import { authLoginSchema, authRegisterSchema } from "@/schemas/AuthSchema";
import { ZodError } from "zod";
import { toast } from "react-toastify";
import CartService from "@/services/CartService";
import { useAuth } from "@/context/AuthContext";

export default function AuthCard() {
  const [seePassword, setSeePassword] = useState(false);
  const [payloadLogin, setPayloadLogin] = useState<AuthLoginDTO>({
    auth: { email: "", password: "" }
  });
  const [payloadRegister, setPayloadRegister] = useState<AuthRegisterDTO>({
    auth: { email: "", password: "", username: "", name: "" }
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { login: loginContext } = useAuth();

  useEffect(() => {
    setIsRegister(pathname === "/auth/register");
  }, [pathname]);

  const validateForm = (data: AuthLoginDTO | AuthRegisterDTO) => {
    try {
      if (isRegister) {
        authRegisterSchema.parse(data);
      } else {
        authLoginSchema.parse(data);
      }
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

  const updatePayload = (field: string, value: string) => {
    if (isRegister) {
      const updated = {
        auth: { ...payloadRegister.auth, [field]: value }
      };
      setPayloadRegister(updated);
      validateForm(updated);
    } else {
      const updated = {
        auth: { ...payloadLogin.auth, [field]: value }
      };
      setPayloadLogin(updated);
      validateForm(updated);
    }
  };

  const login = async () => {
  if (!isValid || loading) return;

  try {
    setLoading(true);
    const data = await AuthService.login(payloadLogin);

    if (data) {
      toast.success("Login realizado com sucesso!");
      loginContext(data);
      CartService.saveCart([], data.id);
      router.push('/home');
      }

    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Erro ao realizar login");
    } finally {
      setLoading(false);
    }
  };

  const register = async () => {
    if (!isValid || loading) return;

    try {
      setLoading(true);
      const data = await AuthService.register(payloadRegister);
      if (data) toast.success("Cadastro realizado com sucesso!");
      router.push("/auth/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Erro ao realizar cadastro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.card}>
      <div className={style.card_header}>
        <div className={style.card_circle}>
          <BookOpen color="#FFF" size={32} />
        </div>

        <div className={style.card_header_text}>
          <h3>Book Store</h3>
          <span>
            {isRegister ? "Cadastre sua conta" : "Entre na sua conta"}
          </span>
        </div>
      </div>

      <div className={style.card_body}>
        {isRegister && (
          <>
            <div className={style.card_input}>
              <label>Nome</label>
              <input
                type="text"
                placeholder="Digite seu nome"
                onChange={e => updatePayload("name", e.target.value)}
              />
            </div>
            {errors["auth.name"] && (
            <span className={style.error_message}>{errors["auth.name"]}</span>
            )}

            <div className={style.card_input}>
              <label>Nome de usuário</label>
              <input
                type="text"
                placeholder="Digite seu nome de usuário"
                onChange={e => updatePayload("username", e.target.value)}
              />
            </div>
            {errors["auth.username"] && (
                <span className={style.error_message}>{errors["auth.username"]}</span>
            )}
          </>
        )}

        <div className={style.card_input}>
          <label>Email</label>
          <input
            type="text"
            placeholder="seu@email.com"
            onChange={e => updatePayload("email", e.target.value)}
          />
        </div>
        {errors["auth.email"] && (
          <span className={style.error_message}>{errors["auth.email"]}</span>
        )}

        <div className={style.card_input}>
          <label>Senha</label>
          <input
            type={seePassword ? "text" : "password"}
            placeholder="sua senha"
            onChange={e => updatePayload("password", e.target.value)}
          />
          {seePassword ? (
            <EyeClosed
              color="#FF6D00"
              className={style.icon_view}
              onClick={() => setSeePassword(false)}
            />
          ) : (
            <Eye
              color="#FF6D00"
              className={style.icon_view}
              onClick={() => setSeePassword(true)}
            />
          )}
        </div>
        {errors["auth.password"] && (
          <span className={style.error_message}>{errors["auth.password"]}</span>
        )}

        <button
          className={style.signin}
          disabled={!isValid || loading}
          onClick={isRegister ? register : login}
        >
          {isRegister ? "Cadastrar" : "Entrar"}
        </button>

        <p>
          {isRegister ? "Já possui conta?" : "Não tem uma conta?"}{" "}
          <Link href={isRegister ? "/auth/login" : "/auth/register"}>
            {isRegister ? "Fazer login" : "Cadastrar-se"}
          </Link>
        </p>
      </div>

      {!isRegister && (
        <>
            <div className={style.card_login_info}>
                <h4>Logado no nosso sistema</h4>
                <ol>
                  <li>Tenha acesso ao carrinho de compras</li>
                  <li>Gerencie seus pedidos</li>
                  <li>Receba ofertas exclusivas</li>
                  <li>Deixe sua experiência mais completa</li>
                </ol>
            </div>

            <p className={style.card_footer}>
                © 2024 Book Store. Todos os direitos reservados.
            </p>
        </>
      )}
    </div>
  );
}
