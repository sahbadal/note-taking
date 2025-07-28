import app from "./app";
import { PORT } from "./config/envConfig";





const startServer = async () => {

    app.listen(PORT, () => {
        console.log(`Server is running on: http://localhost:${PORT}`);
    });
}

startServer()