// Tipos basados en el esquema de la base de datos    
interface UserProfile {
    id: number;
    email: string;
    password_hash: string; // Si es necesario, aunque no se suele mostrar en el perfil  
    first_name: string;
    last_name: string;
    role: 'ADMIN' | 'COMPANY_ADMIN' | 'INTERVIEWER' | 'APPLICANT'; // Actualizado para incluir todos los roles  
    phone?: string;
    profile_picture?: string;
    profession?: string; // Nuevo campo  
    location?: string; // Nuevo campo  
    bio?: string; // Nuevo campo  
    experience_years?: string; // Nuevo campo  
    education?: string; // Nuevo campo  
    languages?: string; // Nuevo campo  
    resume_url?: string;
    linkedin_url?: string;
    github_url?: string;
    website?: string; // Nuevo campo  
    is_active: boolean; // Este campo puede ser útil para el estado del usuario  
    created_at: string; // Timestamp como string  
    updated_at: string; // Timestamp como string  
}

interface UpdateProfileData {
    first_name?: string; // Opcional para la actualización  
    last_name?: string; // Opcional para la actualización  
    phone?: string; // Opcional para la actualización  
    profession?: string; // Nuevo campo  
    location?: string; // Nuevo campo  
    bio?: string; // Nuevo campo  
    experience_years?: string; // Nuevo campo  
    education?: string; // Nuevo campo  
    languages?: string; // Nuevo campo  
    resume_url?: string; // Opcional para la actualización  
    linkedin_url?: string; // Opcional para la actualización  
    github_url?: string; // Opcional para la actualización  
    website?: string; // Nuevo campo  
}

// Configuración base para fetch    
const BASE_URL = process.env.API_URL || 'http://localhost:3009';

// Función auxiliar para manejar errores    
const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'An error occurred');
    }
    return response.json();
};

// Función auxiliar para obtener el token de las cookies    
const getTokenFromCookies = (): string | null => {
    const match = document.cookie.match(/(?:^|;\s*)token=([^;]*)/);
    return match ? match[1] : null;
};

// Función auxiliar para obtener headers comunes    
const getHeaders = () => {
    const token = getTokenFromCookies(); // Obtener el token de las cookies  
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
};

export const profileService = {
    // Obtener perfil del usuario    
    async getProfile(): Promise<UserProfile> {
        try {
            const response = await fetch(`${BASE_URL}/users/profile/`, {
                method: 'GET',
                headers: getHeaders(),
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error fetching profile:', error);
            throw error;
        }
    },

    // Actualizar perfil del usuario    
    async updateProfile(data: UpdateProfileData): Promise<UserProfile> {
        try {
            const response = await fetch(`${BASE_URL}/users/profile`, {
                method: 'PATCH',
                headers: getHeaders(),
                body: JSON.stringify(data),
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    },

    // Subir CV    
    async uploadResume(file: File): Promise<{ resume_url: string }> {
        try {
            const formData = new FormData();
            formData.append('resume', file);

            const response = await fetch(`${BASE_URL}/users/profile/resume`, {
                method: 'POST',
                headers: {
                    'Authorization': getHeaders().Authorization,
                    // No incluimos Content-Type aquí porque FormData lo establece automáticamente    
                },
                body: formData,
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error uploading resume:', error);
            throw error;
        }
    },

    // Eliminar CV    
    async deleteResume(): Promise<void> {
        try {
            const response = await fetch(`${BASE_URL}/users/profile/resume`, {
                method: 'DELETE',
                headers: getHeaders(),
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error deleting resume:', error);
            throw error;
        }
    },

    // Obtener habilidades del usuario    
    async getUserSkills(): Promise<string[]> {
        try {
            const response = await fetch(`${BASE_URL}/users/profile/skills`, {
                method: 'GET',
                headers: getHeaders(),
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error fetching user skills:', error);
            throw error;
        }
    },

    // Actualizar habilidades del usuario    
    async updateUserSkills(skills: string[]): Promise<string[]> {
        try {
            const response = await fetch(`${BASE_URL}/users/profile/skills`, {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify({ skills }),
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error updating user skills:', error);
            throw error;
        }
    }
};

// Manejador de errores personalizado    
export class ApiError extends Error {
    constructor(
        public status: number,
        message: string
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

// Exportamos el tipo para uso en otros componentes    
export type { UpdateProfileData, UserProfile };
