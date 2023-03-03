import { dbSource } from '../../utils/source';
import { Conversation } from '../model/Conversation';
import { InsertResult } from 'typeorm';

const eventRepository = dbSource.getRepository(Conversation);

export class repository {
   static save = async (e: Conversation): Promise<Conversation | null> => {
      return eventRepository.save(e);
   };

   static bulkInsert = (list: Conversation[]): Promise<InsertResult> => {
      return eventRepository.createQueryBuilder().insert().into(Conversation).values(list).execute();
   };

   static findAllConversation = async (id: string): Promise<Conversation[] | null> => {
      return eventRepository.find({
         where: [{ conversationId: id }],
         order: {
            createdAt: 'ASC',
         },
      });
   };
}
