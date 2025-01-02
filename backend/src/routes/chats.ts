import { Router } from 'express';
import { chatController } from '../controllers/chatController';
import { validateChatLog } from '../middleware/validators';

const router = Router();

router.post('/', validateChatLog, chatController.logMessage);
router.get('/:email', chatController.getHistory);

export const chatRoutes = router;