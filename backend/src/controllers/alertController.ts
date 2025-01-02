import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { logger } from '../utils/logger';

export const alertController = {
  async create(req: Request, res: Response) {
    try {
      const { email, coin, targetPrice, type } = req.body;

      const { data, error } = await supabase
        .from('price_alerts')
        .insert({
          email,
          coin,
          target_price: targetPrice,
          type
        });

      if (error) throw error;

      res.status(201).json(data);
    } catch (error) {
      logger.error('Error creating price alert:', error);
      res.status(500).json({ error: 'Failed to create price alert' });
    }
  },

  async getAlerts(req: Request, res: Response) {
    try {
      const { email } = req.params;

      const { data, error } = await supabase
        .from('price_alerts')
        .select('*')
        .eq('email', email)
        .eq('triggered', false);

      if (error) throw error;

      res.json(data);
    } catch (error) {
      logger.error('Error fetching alerts:', error);
      res.status(500).json({ error: 'Failed to fetch alerts' });
    }
  },

  async updateAlert(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { triggered } = req.body;

      const { data, error } = await supabase
        .from('price_alerts')
        .update({ triggered })
        .eq('id', id);

      if (error) throw error;

      res.json(data);
    } catch (error) {
      logger.error('Error updating alert:', error);
      res.status(500).json({ error: 'Failed to update alert' });
    }
  }
};