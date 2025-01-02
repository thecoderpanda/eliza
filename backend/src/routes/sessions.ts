import { Router } from 'express';
import { sessionController } from '../controllers/sessionController';
import { validateSession } from '../middleware/validators';

const router = Router();

router.post('/', validateSession, sessionController.create);
router.get('/:email', sessionController.get);
router.put('/:email', sessionController.update);

export const sessionRoutes = router;