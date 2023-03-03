import { Conversation } from '../db/model/Conversation';
import { GeneralDTO } from './types';

export const mapper = async (e: Conversation[]): Promise<GeneralDTO[]> => {
   const mapper: GeneralDTO[] = e.map((e: Conversation) => ({
      user: e.conversationId,
      userMessage: e.userMessage,
      echoMessage: e.echoMessage,
   }));

   return mapper;
};
