import { ApiResponse, ApiError } from '../types';

class ApiServiceError extends Error {
  constructor(message: string, public details?: ApiError) {
    super(message);
    this.name = 'ApiServiceError';
  }
}

export const api = {
  async processGeneralQuery(input: string): Promise<ApiResponse> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      const response = await fetch('http://192.168.73.211:8001/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new ApiServiceError('Failed to connect to the server', {
          status: response.status,
          message: `Server returned ${response.status}`,
        });
      }

      const data = await response.json();
      
      if (!data || typeof data !== 'object') {
        throw new ApiServiceError('Invalid response format');
      }

      return { 
        text: data.message || data.response || 'No response from server'
      };
    } catch (error) {
      if (error instanceof ApiServiceError) {
        throw error;
      }
      if (error.name === 'AbortError') {
        throw new ApiServiceError('Request timed out. Please try again.');
      }
      if (!navigator.onLine) {
        throw new ApiServiceError('No internet connection. Please check your network.');
      }
      throw new ApiServiceError(
        'Unable to connect to the server. Please try again later.'
      );
    }
  },

  async processInstantFeedback(input: string): Promise<ApiResponse> {
    // TODO: Implement instant feedback API endpoint
    return { text: 'Instant feedback feature coming soon!' };
  }
};