import mongoose from 'mongoose';
import 'dotenv/config';

class Database {
    constructor() {
        this.connect();
    }

    connect() {
        const dbConnectionPath: string = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_CLUSTER}.${process.env.DATABASE_CODE}.mongodb.net/a`;
        mongoose.connect(dbConnectionPath);
        mongoose.connection.on('error', () => {
            console.log('Could not connect to database.');
        });
        mongoose.connection.once('open', () => {
            console.log(`Connection established with the database ${process.env.DATABASE_COLLECTION}.`);
        });
        return mongoose.connection;
    }
}

export default new Database().connect;