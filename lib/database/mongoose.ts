import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;


interface MongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;

}

let cached: MongooseConnection = (global as any).mongoose

if (!cached) {
    cached = (global as any).mongoose = {
        conn: null, promise: null
    }
}

export const connectTodb = async () => {
    try {
        if (cached.conn) return cached.conn

        if (!MONGODB_URL) throw new Error("mongodb url not found");

        cached.promise =  cached.promise || mongoose.connect(MONGODB_URL , {
            dbName: 'podcast', bufferCommands:false
        })
        cached.conn = await cached.promise;
        console.log("conected to database");


        return cached.conn;
    } catch (error) {
        console.log(error)
    }

}