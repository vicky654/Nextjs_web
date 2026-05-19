import mongoose from 'mongoose';

declare global {
  var _mongooseConn: typeof mongoose | undefined;
  var _mongoosePromise: Promise<typeof mongoose> | undefined;
}

async function connectDB(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      'MONGODB_URI is not defined. Add it to .env.local and restart the dev server.'
    );
  }

  // Already connected — reuse the existing connection
  if (global._mongooseConn?.connection.readyState === 1) {
    return global._mongooseConn;
  }

  // If a connection attempt is already in flight, wait for it
  if (!global._mongoosePromise) {
    global._mongoosePromise = mongoose
      .connect(uri, { bufferCommands: false })
      .catch((err) => {
        // Reset so the next call retries instead of getting the same rejected promise
        global._mongoosePromise = undefined;
        throw err;
      });
  }

  global._mongooseConn = await global._mongoosePromise;
  return global._mongooseConn;
}

export default connectDB;
