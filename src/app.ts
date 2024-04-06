import { preparePostmanResultV2 } from "./parser/postman.parser.v2";
import { dumpToDatabase } from "./service/db/dumpToDb";
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

function urlDecode(str: string) {
  return decodeURIComponent(str.replace(/\+/g, " "));
}

export async function handler(event: S3Event, context: object) {
  const responsePromise = event.Records.map(async (record) => {
    const bucket = urlDecode(record.s3.bucket.name);
    const file = urlDecode(record.s3.object.key);
    logger.info(`Processing file ${file} from bucket ${bucket}`);
    const body = await s3.getObject({ Bucket: bucket, Key: file }).promise();

    const text = body?.Body?.toString();
    if (!text) return;

    const data = JSON.parse(text);

    if (bucket === "qa-cypress-logs") {
      await dumpToDatabase(data);
    } else if (bucket === "qa-postman-logs") {
      const postmanResult = preparePostmanResultV2(data);

      await dumpToDatabase(postmanResult);
    }
  });
  await Promise.all(responsePromise);
}
