import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { logger } from '../utils/logger';

export const sessionController = {
  async create(req: Request, res: Response) {
    try {
      const { email } = req.body;
      
      const { data, error } = await supabase
        .from('user_sessions')
        .upsert({
          email,
          last_active: new Date().toISOString()
        });

      if (error) throw error;

      res.status(201).json(data);
    } catch (error) {
      logger.error('Error creating session:', error);
      res.status(500).json({ error: 'Failed to create session' });
    }
  },

  async get(req: Request, res: Response) {
    try {
      const { email } = req.params;

      const { data, error } = await supabase
        .from('user_sessions')
        .select('*')
        .eq('email', email)
        .single();

      if (error) throw error;

      res.json(data);
    } catch (error) {
      logger.error('Error fetching session:', error);
      res.status(500).json({ error: 'Failed to fetch session' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { email } = req.params;
      
      const { data, error } = await supabase
        .from('user_sessions')
        .update({ last_active: new Date().toISOString() })
        .eq('email', email);

      if (error) throw error;

      res.json(data);
    } catch (error) {
      logger.error('Error updating session:', error);
      res.status(500).json({ error: 'Failed to update session' });
    }
  }
};