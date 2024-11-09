export type ChatMode = 'general' | 'feedback';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ApiResponse {
  text: string;
}

export interface ApiError {
  message: string;
  status?: number;
}