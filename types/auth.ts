// types/auth.ts  
export type UserRole = "APPLICANT" | "ADMIN" | "COMPANY_ADMIN" | "INTERVIEWER";

export type RegisterData = {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    role: UserRole;
    phone?: string;
    company_id?: number | null; // Cambiado a number ya que en la BD es INT
    isGoogle?: boolean; // Cambiado a boolean ya que en la BD es BOOLEAN
};
