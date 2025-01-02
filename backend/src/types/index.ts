export interface Session {
  email: string;
  last_active: string;
  created_at: string;
}

export interface ChatLog {
  id: number;
  email: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  created_at: string;
}

export interface PriceAlert {
  id: string;
  email: string;
  coin: string;
  target_price: number;
  type: 'above' | 'below';
  triggered: boolean;
  created_at: string;
}