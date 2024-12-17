export const skillsService = {
    /**
     * Busca skills por nombre con autocompletado.
     * @param query El término de búsqueda.
     * @returns Una lista de skills que coinciden con el término.
     */
    async searchSkills(query: string): Promise<string[]> {
        if (!query || query.length < 2) {
            return [];
        }

        try {
            const response = await fetch(`/api/user/skills?query=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error('Failed to fetch skills');
            }
            const data = await response.json();
            return data.map((skill: { name: string }) => skill.name);
        } catch (error) {
            console.error('Error fetching skills:', error);
            return [];
        }
    },

    /**
     * Obtiene todos los skills disponibles.
     * @returns Una lista completa de skills.
     */
    async getAllSkills(): Promise<{ id: string; name: string; category: string }[]> {
        try {
            const response = await fetch(`/api/user/skills`);
            if (!response.ok) {
                throw new Error('Failed to fetch all skills');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching all skills:', error);
            return [];
        }
    },
};