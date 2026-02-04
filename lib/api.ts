const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
}

interface RegisterData {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

interface LoginData {
    email: string;
    password: string;
}

interface ForgotPasswordData {
    email: string;
}

interface ResetPasswordData {
    incomingToken: string;
    newPassword: string;
}

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const data = await response.json();

    if (!response.ok) {
        return {
            success: false,
            message: data.message || 'An error occurred',
        };
    }

    return {
        success: true,
        data: data,
    };
}

export const authApi = {
    async register(data: RegisterData): Promise<ApiResponse<unknown>> {
        const response = await fetch(`${API_BASE_URL}/identity/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    async login(data: LoginData): Promise<ApiResponse<unknown>> {
        const response = await fetch(`${API_BASE_URL}/identity/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    async logout(): Promise<ApiResponse<unknown>> {
        const response = await fetch(`${API_BASE_URL}/identity/logout`, {
            method: 'POST',
            credentials: 'include',
        });
        return handleResponse(response);
    },

    async forgotPassword(data: ForgotPasswordData): Promise<ApiResponse<unknown>> {
        const response = await fetch(`${API_BASE_URL}/identity/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    async resetPassword(data: ResetPasswordData): Promise<ApiResponse<unknown>> {
        const response = await fetch(`${API_BASE_URL}/identity/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    async refreshToken(): Promise<ApiResponse<unknown>> {
        const response = await fetch(`${API_BASE_URL}/identity/auth/refresh`, {
            method: 'POST',
            credentials: 'include',
        });
        return handleResponse(response);
    },
};
