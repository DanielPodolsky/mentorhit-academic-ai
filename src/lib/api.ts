export interface ChatRequest {
    message: string;
    userId: string;
    history?: ConversationMessage[]; // 🆕 Added history support
}

export interface ConversationMessage {
    role: 'user' | 'assistant';
    content: Array<{ text: string }>;
}

export interface ChatResponse {
    success: boolean;
    message: string;
    receivedMessage: string;
    userId: string;
    timestamp: string;
    history: ConversationMessage[]; // 🆕 Added history in response
    historyLength: number; // 🆕 Added history length

    // Metadata from your Lambda
    aiPlanUsed: {
        datasets: string[];
        useKnowledgeBase: boolean;
        searchCourses: boolean;
        searchJobs: boolean;
        conversationContextUsed: boolean;
    };
    dataSourcesQueried: string[];
    datasetsIncluded: {
        grades: boolean;
        preferences: boolean;
        courses: boolean;
        jobs: boolean;
    };

    // Performance metrics
    demoMode: boolean;
    knowledgeBaseUsed: boolean;
    jobSearchUsed: boolean;
    modelUsed: string;
    responseTime: number;
    optimized: boolean;
    conversationEnabled: boolean;

    // Debug info
    debug: {
        plannerSource: string;
        datasetsRequested: string[];
        coursesFound: number;
        jobsFound: number;
        historyManaged: boolean;
    };
}

export interface APIError {
    error: string;
    details?: string;
    message?: string;
}

export const chatAPI = {
    sendMessage: async (request: ChatRequest): Promise<ChatResponse> => {
        try {
            console.log('🚀 Sending request to AWS Lambda:', {
                message: request.message,
                userId: request.userId,
                historyLength: request.history?.length || 0
            });

            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

            const response = await fetch(`${API_BASE_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });

            console.log('📡 AWS Response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ AWS API Error:', errorText);
                throw new Error(`API Error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log('✅ AWS Response received:', {
                success: data.success,
                messageLength: data.message?.length || 0,
                historyLength: data.historyLength || 0,
                responseTime: data.responseTime,
                modelUsed: data.modelUsed,
                conversationEnabled: data.conversationEnabled
            });

            return data;
        } catch (error) {
            console.error('❌ Chat API Error:', error);
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