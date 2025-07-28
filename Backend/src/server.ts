import app from "./app";
import dotenv from 'dotenv';
import connectDB from "./config/db";

dotenv.config();

const startServer = async () => {
    await connectDB();

    app.listen(process.env.PORT, () => {
        console.log(`Server is running on: http://localhost:${process.env.PORT}`);
    });
}

startServer()