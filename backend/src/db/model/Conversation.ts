import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn } from 'typeorm';

@Entity('conversation')
export class Conversation extends BaseEntity {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   conversationId: string;

   @Column({ nullable: true })
   userMessage: string;

   @Column({ nullable: true })
   echoMessage: string;

   @Column()
   @CreateDateColumn()
   createdAt: Date;

   @Column({ default: false })
   isDeleted: boolean;

   constructor(data?: any) {
      super();
      if (data) {
         this.conversationId = data.conversationId;
         this.userMessage = data.userMessage;
         this.echoMessage = data.echoMessage;
      }
   }
}
