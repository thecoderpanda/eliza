import { Router } from 'express';
import { alertController } from '../controllers/alertController';
import { validateAlert } from '../middleware/validators';

const router = Router();

router.post('/', validateAlert, alertController.create);
router.get('/:email', alertController.getAlerts);
router.put('/:id', alertController.updateAlert);

export const alertRoutes = router;