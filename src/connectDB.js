import mongoose from 'mongoose';

let isConnected = false;

export const connect = async () => {
  mongoose.set('strictQuery', true);
  //This means that documents created using this schema are subject to strict mode. If you attempt to save a document with fields not defined in the schema, Mongoose will throw an error.

  if (isConnected) {
    console.log('mongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('connected');
  } catch (error) {
    console.log('failed to connected mongoose database');
    console.log(error);
  }
};
