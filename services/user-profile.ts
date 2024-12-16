import { UpdateProfileData, UserProfile } from "@/types/user";

export const profileService = {
    async getProfile(): Promise<UserProfile> {
        const response = await fetch('/api/user/profile', {
            credentials: 'include', // Importante: incluye las cookies en la solicitud
        });

        if (!response.ok) {
            if (response.status === 401) {
                window.location.href = '/auth/login';
                throw new Error('Unauthorized');
            }
            throw new Error('Failed to fetch profile');
        }

        return response.json();
    },

    async updateProfile(data: UpdateProfileData): Promise<UserProfile> {
        const response = await fetch('/api/user/profile', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Failed to update profile');
        }
        return response.json();
    },

    async uploadResume(file: File): Promise<{ resume_url: string }> {
        const formData = new FormData();
        formData.append('resume', file);

        const response = await fetch('/api/user/profile/resume', {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            throw new Error('Failed to upload resume');
        }
        return response.json();
    },

    async deleteResume(): Promise<void> {
        const response = await fetch('/api/user/profile/resume', {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete resume');
        }
    },

    async uploadProfilePicture(file: File): Promise<{ url: string }> {
        const formData = new FormData();
        formData.append('profile_picture', file);

        const response = await fetch('/api/user/profile/picture', {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            throw new Error('Failed to upload profile picture');
        }
        return response.json();
    },

    async downloadResume(): Promise<Blob> {
        const response = await fetch('/api/user/profile/resume', {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error('Failed to download resume');
        }
        return response.blob();
    },
};