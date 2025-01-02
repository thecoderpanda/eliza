import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { logger } from '../utils/logger';

export const chatController = {
  async logMessage(req: Request, res: Response) {
    try {
      const { email, content, sender, timestamp } = req.body;

      const { data, error } = await supabase
        .from('chat_logs')
        .insert({
          email,
          content,
          sender,
          timestamp
        });

      if (error) throw error;

      res.status(201).json(data);
    } catch (error) {
      logger.error('Error logging chat message:', error);
      res.status(500).json({ error: 'Failed to log chat message' });
    }
  },

  async getHistory(req: Request, res: Response) {
    try {
      const { email } = req.params;

      const { data, error } = await supabase
        .from('chat_logs')
        .select('*')
        .eq('email', email)
        .order('timestamp', { ascending: true });

      if (error) throw error;

      res.json(data);
    } catch (error) {
      logger.error('Error fetching chat history:', error);
      res.status(500).json({ error: 'Failed to fetch chat history' });
    }
  }
};