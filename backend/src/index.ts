import app from './app/app';
import { port } from './app/config';
import { logger } from './app/logger';
import { dbSource } from './utils/source';

app.listen(port, async () => {
   try {
      await dbSource.initialize();
      logger.warn('db successfully connected');
   } catch (err: any) {
      logger.error('typeorm error : ' + err?.message || err?.stack || err);
   }
}).on('error', (e: any) => console.log(e));
