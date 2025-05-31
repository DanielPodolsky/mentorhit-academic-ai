
export interface ChatRequest {
    message: string;
    userId: string;
}

export interface ChatResponse {
    success: boolean;
    message: string;
    receivedMessage: string;
    userId: string;
    timestamp: string;
}

export interface APIError {
    error: string;
    details?: string;
}

export const chatAPI = {
    sendMessage: async (request: ChatRequest): Promise<ChatResponse> => {
        try {
            console.log('Sending request to AWS:', request);
            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

            const response = await fetch(`${API_BASE_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });

            console.log('AWS Response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('AWS API Error:', errorText);
                throw new Error(`API Error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log('AWS Response data:', data);

            return data;
        } catch (error) {
            console.error('Chat API Error:', error);
            throw error;
        }
    },
};

// Additional API endpoints for future use
export const mentorHitAPI = {
    // Chat endpoint
    chat: chatAPI,

    // Future endpoints
    getUserProfile: async (userId: string) => {
        // TODO: Implement when we add user profile API
        throw new Error('Not implemented yet');
    },

    getPreferences: async (userId: string) => {
        // TODO: Implement when we add preferences API
        throw new Error('Not implemented yet');
    },

    savePreferences: async (userId: string, preferences: any) => {
        // TODO: Implement when we add preferences API
        throw new Error('Not implemented yet');
    },
};