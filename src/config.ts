import { join } from "path";

export const TEST_DIR = join(process.env.HOME || "", "test-data");
console.log(TEST_DIR);
