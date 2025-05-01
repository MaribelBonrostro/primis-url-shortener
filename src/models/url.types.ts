import { Document } from 'mongodb';

export type Url = Document & {
  originalUrl: string;
  shortenUrlKey: string;
  createdAt: Date;
};
