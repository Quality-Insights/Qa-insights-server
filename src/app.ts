import express from "express";
import serverless from "serverless-http";
import morgan from "morgan";
import logger, { l } from "./utils/logger";

export const app = express();

app.use(morgan("common"));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const serverlessHandler = serverless(app);

export async function handler(event: Object, context: Object) {
  logger.info(l`Received event: ${event}`);
  logger.info(l`Received context: ${context}`);
  const result = await serverlessHandler(event, context);
  return result;
}
