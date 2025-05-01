import { connect } from 'mongoose';
import { MONGODB } from '../../env';

// Connect to MongoDB
export const connectToMongoDB = async (): Promise<void> => {
  try {
    await connect(MONGODB.URL!, {
      dbName: MONGODB.DBNAME,
    });
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};
