import express from 'express';
import { echoMessage, getMessages, healthCheck } from '../controller';

const router = express.Router();

router.get('/health', healthCheck);
router.get('/:conversationId', getMessages);
router.post('/echo/:conversationId', echoMessage);

export default router;
