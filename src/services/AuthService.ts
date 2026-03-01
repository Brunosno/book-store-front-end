import api from '@/lib/api';
import { AuthLoginDTO, AuthResponseDTO } from '@/types/AuthType';

const AuthService = {
    async login(payload: AuthLoginDTO): Promise<AuthResponseDTO> {
        const { data } = await api.post<AuthResponseDTO>('/auth/login', payload);

        if (data?.token) {
            localStorage.setItem('authToken', data.token);
        }

        return data;
    },

    async register(payload: AuthLoginDTO): Promise<AuthResponseDTO>{
        const { data } = await api.post<AuthResponseDTO>('/auth/register', payload);

        if (data?.token) {
            localStorage.setItem('authToken', data.token);
        }

        return data;
    },

    async logout() {
        localStorage.removeItem('authToken');
    }
};

export default AuthService;