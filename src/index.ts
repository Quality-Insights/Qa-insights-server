import { app } from "./app";
import logger from "./utils/logger";

app.listen(3000, () => {
  logger.info("Server running on port 3000");
});
