// types/auth.ts  
export type UserRole = 'ADMIN' | 'APPLICANT';

export type RegisterData = {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    role: UserRole;
    phone?: string;
    company_id?: number | null; // Cambiado a number ya que en la BD es INT  
};

