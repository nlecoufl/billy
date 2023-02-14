import * as mongoose from 'mongoose';

export class Mongoose {
    options = {
        autoIndex: false,
        poolSize: 10,
        bufferMaxEntries: 0,
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    public static async initDB() {
        mongoose.set('strictQuery', false);
        return mongoose.connect("mongodb://"+process.env.MONGO_URI);
    }
    public static async closeCon() {
        return mongoose.connection.close(true);
    }
}