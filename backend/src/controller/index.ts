import { Request, Response } from 'express';
import { logger } from '../app/logger';
import { Health } from '../utils/types';
import { repository } from '../db/repository/repository';
import { mapper } from '../utils/mapper';
import { Conversation } from '../db/model/Conversation';

export const healthCheck = async (req: Request, res: Response): Promise<any> => {
   try {
      let health: Array<Health> = [{ name: 'backend-service', status: 'UP' }];
      return res.status(200).json(health);
   } catch (err: any) {
      logger.error(`Error occured while health checking Error message:` + err?.message || err?.data);
      return res.status(400).json({ message: `Error occured:` + err?.message || err?.data });
   }
};

export const getMessages = async (req: Request, res: Response): Promise<any> => {
   try {
      const { conversationId } = req.params;

      const messages = await repository.findAllConversation(conversationId);

      if (!messages?.length) return res.status(404).json({ message: 'Not found any conversation with given id' });

      return res.status(200).json(await mapper(messages));
   } catch (err: any) {
      logger.error(`Error occured while getting messages Error message:` + err?.message || err?.data);
      return res.status(400).json({ message: `Error occured:` + err?.message || err?.data });
   }
};

export const echoMessage = async (req: Request, res: Response): Promise<any> => {
   try {
      const { conversationId } = req.params;
      const { message } = req.body;

      let list: Array<Conversation> = [];

      const userMessage = new Conversation({
         conversationId,
         userMessage: message,
         echoMessage: null,
      });

      const echoMessage = new Conversation({
         conversationId,
         userMessage: null,
         echoMessage: message,
      });

      try {
         list = [userMessage, echoMessage];
         await repository.bulkInsert(list);

         return res.status(200).json(await mapper(list));
      } catch (err: any) {
         logger.error(`Error occured while insert the message Error message:` + err?.message || err?.data);
         return res.status(400).json({ message: `Error occured:` + err?.message || err?.data });
      }
   } catch (err: any) {
      logger.error(`Error occured while parsing Error message:` + err?.message || err?.data);
      return res.status(400).json({ message: `Error occured:` + err?.message || err?.data });
   }
};
