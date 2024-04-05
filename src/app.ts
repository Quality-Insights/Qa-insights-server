import express, { urlencoded } from "express";
import morgan from "morgan";
import router from "./route";
import logger from "./utils/logger";

const app = express();

app.use(morgan("common"));

app.use(express.json());

app.use(router);

app.listen(8888, () => {
  logger.info("Server is running on port 8888");
});

export default app;
