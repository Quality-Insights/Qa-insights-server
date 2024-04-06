import { S3Event } from "./types/s3";
import logger, { l } from "./utils/logger";
import aws from "aws-sdk";
const awsCreds = {
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_KEY_SECRET,
};

logger.info(l`AWS credentials: ${awsCreds}`);
// aws.config.update(awsCreds);
const s3 = new aws.S3();

export async function handler(event: S3Event, context: object) {
  const responsePromise = event.Records.map(async (record) => {
    const bucket = record.s3.bucket.name;
    const file = record.s3.object.key;
    logger.info(`Processing file ${file} from bucket ${bucket}`);
    const data = await s3.getObject({ Bucket: bucket, Key: file }).promise();
    logger.info(`File content: ${data}`);
    if (bucket === "qa-cypress-logs") {
      //parse cypress log and insert to database
      logger.info(`Parsing cypress log`);
    } else if (bucket === "qa-postman-logs") {
      //parse postman log and insert to database
      logger.info(`Parsing postman log`);
    }
  });
  await Promise.all(responsePromise);
}
