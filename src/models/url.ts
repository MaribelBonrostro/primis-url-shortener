import { model, Schema } from 'mongoose';
import { Url } from './url.types';

const urlSchema = new Schema<Url>({
  originalUrl: String,
  shortenUrlKey: String,
  createdAt: {
    type: Date,
    default: () => new Date(), // Use a function to ensure the default is set at document creation
  },
});

export default model<Url>('Url', urlSchema, 'Url');
