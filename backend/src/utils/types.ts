export type Health = {
   name: string;
   status: 'UP' | 'DOWN';
};

export type GeneralDTO = {
   user: string;
   userMessage: string | null;
   echoMessage: string | null;
};
