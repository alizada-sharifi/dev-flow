import mongoose from "mongoose";
import { NotFoundError } from "./http-errors";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}
declare global {
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = (typeof global !== "undefined"
  ? global.mongoose
  : undefined) ?? { conn: null, promise: null };

if (typeof global !== "undefined") {
  global.mongoose = cached;
}

export default async function dbConnect(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new NotFoundError("MONGODB_URI");

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, { bufferCommands: false })
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
