import * as dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { db } from '../app/config';
import { Conversation } from '../db/model/Conversation';
import { mg1677837754028 } from '../db/migration/1677837754028-mg';

export const dbSource = new DataSource({
   name: 'default',
   host: db.host,
   port: parseInt(db.port),
   username: db.user,
   password: db.password,
   database: db.name,
   schema: db.schema,
   type: 'postgres',
   synchronize: process.argv[1].split('/')?.find((piece: string) => piece === 'build') ? false : true,
   logging: false,
   entities: [Conversation],
   migrations: [mg1677837754028],
});
