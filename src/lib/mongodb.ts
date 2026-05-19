import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not defined');
}

declare global {
  var _mongooseConn: typeof mongoose | undefined;
  var _mongoosePromise: Promise<typeof mongoose> | undefined;
}

async function connectDB(): Promise<typeof mongoose> {
  if (global._mongooseConn?.connection.readyState === 1) {
    return global._mongooseConn;
  }

  if (!global._mongoosePromise) {
    global._mongoosePromise = mongoose.connect(MONGODB_URI as string, {
      bufferCommands: false,
    });
  }

  global._mongooseConn = await global._mongoosePromise;
  return global._mongooseConn;
}

export default connectDB;
