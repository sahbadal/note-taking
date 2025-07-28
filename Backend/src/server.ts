import app from "./app";
import { PORT } from "./config/envConfig";
import connectDB from "./config/db";



const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server is running on: http://localhost:${PORT}`);
    });
}

startServer()