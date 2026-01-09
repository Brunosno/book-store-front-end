export type AuthLoginDTO = {
    auth: {
        email: string;
        password: string;
    };
};

export type AuthResponseDTO = {
    id: number;
    username: string;
    is_admin: boolean;
    token: string;
};