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
    // Additional fields from your Lambda response
    aiPlanUsed?: {
        datasets: string[];
        useKnowledgeBase: boolean;
        searchCourses: boolean;
        specificQueries?: any[];
    };
    dataSourcesQueried?: string[];
    demoMode?: boolean;
    knowledgeBaseUsed?: boolean;
    modelUsed?: string;
}

export interface APIError {
    success: false;
    error: string;
    message: string;
    timestamp: string;
    details?: string;
}

export const chatAPI = {
    sendMessage: async (request: ChatRequest): Promise<ChatResponse> => {
        try {
            console.log('🚀 Sending request to MentorHIT AWS Lambda:', request);

            // Get the API base URL from environment variables
            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

            if (!API_BASE_URL) {
                console.warn('⚠️ VITE_API_BASE_URL not set, using fallback URL');
            }

            // Use environment variable or fallback URL
            const apiUrl = API_BASE_URL || 'https://your-api-gateway-url.amazonaws.com/prod';

            const response = await fetch(`${apiUrl}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(request),
            });

            console.log('📡 AWS Lambda Response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ AWS API Error:', errorText);
                throw new Error(`API Error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log('✅ AWS Lambda Response data:', data);

            // Validate response structure
            if (!data.success && data.error) {
                throw new Error(data.message || data.error);
            }

            return data as ChatResponse;

        } catch (error) {
            console.error('❌ Chat API Error:', error);

            // Re-throw the error to be handled by the calling component
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