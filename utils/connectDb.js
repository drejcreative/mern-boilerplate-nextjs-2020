import mongoose from 'mongoose';

const connection = {};

const conectDb = async () => {
  if (connection.isConnected) {
    console.log('Using existing connection');
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('DB Conected');
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.error('error', error)
  }
}

export default conectDb;