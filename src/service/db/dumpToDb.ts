import knexInstance from '../../db';
import logger from "../../utils/logger";

export async function dumpToDatabase(result: any) {
  try {
    // Step 1: insert buildStats;
    logger.info(`Inserting build stats info...`);
    await insertBuildStats(result.buildStats);

    // Step 2: insert Tests.
    logger.info(`Inserting Tests info...`);
    await insertTests(result.tests);

    // Step 3: insert TestCase.
    logger.info(`Inserting Test cases info...`);
    await insertTestCases(result.testCases);
  }
  catch (err) {
    logger.error(`Error inserting the data: ${(err as Error).message}`);
  }
}

export async function insertBuildStats(buildStats: any) {
  await knexInstance("buildstats").insert(buildStats);

  logger.info('Inserted build stats successfully!');
}

export async function insertTests(tests: any) {
  for (let test of tests) {
    await knexInstance("test").insert(test);
  }

  logger.info(`Inserted ${tests?.length} Tests successfully!`);
}

export async function insertTestCases(testCases: any) {
  for (let testCase of testCases) {
    await knexInstance("testcases").insert(testCase);
  }

  logger.info(`Inserted ${testCases?.length} Test Cases successfully!`);
}
