import express from "express";
import serverless from "serverless-http";
import morgan from "morgan";

export const app = express();

app.use(morgan("common"));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const serverlessHandler = serverless(app);

export async function handler(event: Object, context: Object) {
  const result = await serverlessHandler(event, context);
  return result;
}
