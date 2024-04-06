import { randomUUID } from "crypto";
import { dumpToDatabase } from "../service/db/dumpToDb";

const startDateTime = new Date("2024-04-05 16:00");
const endDateTime = new Date("2024-04-07 08:00");
const durationMin = 100;
const durationMax = 500;

function randomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomNumber(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min));
}

function generateStartDateTime() {
  return randomDate(startDateTime, endDateTime);
}

function generateDuration() {
  return randomNumber(durationMin, durationMax);
}

// function generateNewSeedData() {
//   const buildId = randomUUID();
//   const buildStats = {
//     build_id: buildId,
//     startdatetime: generateStartDateTime(),
//     duration: generateDuration(),
//     suitescount: stats.suites,
//     tescount: stats.tests,
//     passescount: stats.passes,
//     pendingcount: stats.pending,
//     failurecount: stats.failures,
//     testregisteredcount: stats.testsRegistered,
//     passpercent: stats.passPercent,
//     pendingpercent: stats.pendingPercent,
//     skippedcount: stats.skipped,
//     buildtype: "cypress"
//   };
// }

function generateSeedData() {
  return {
    "buildStats": {
      "build_id": "456f3e9d-68ef-4e3d-9ae1-f16c5ef0fe45",
      "startdatetime": "2024-04-07T08:30:15.789Z",
      "duration": 6723,
      "suitescount": 2,
      "tescount": 5,
      "passescount": 3,
      "pendingcount": 1,
      "failurecount": 1,
      "testregisteredcount": 5,
      "passpercent": 60,
      "pendingpercent": 20,
      "skippedcount": 0,
      "buildtype": "mocha"
    },
    "tests": [
      {
        "test_id": "87b4fba3-fc5b-4b0d-aadf-1c9a926acabe",
        "name": "Login functionality",
        "duration": 104,
        "build_id": "456f3e9d-68ef-4e3d-9ae1-f16c5ef0fe45"
      },
      {
        "test_id": "8b3d7c31-4375-432f-8713-f9d64194a0e3",
        "name": "Shopping Cart tests",
        "duration": 256,
        "build_id": "456f3e9d-68ef-4e3d-9ae1-f16c5ef0fe45"
      },
      {
        "test_id": "cf03e109-af64-4c08-bf2d-fbfaaf5d8e06",
        "name": "Search functionality",
        "duration": 78,
        "build_id": "456f3e9d-68ef-4e3d-9ae1-f16c5ef0fe45"
      },
      {
        "test_id": "4b8d48d2-3f3f-4e99-8979-563d59e4237e",
        "name": "Registration tests",
        "duration": 154,
        "build_id": "456f3e9d-68ef-4e3d-9ae1-f16c5ef0fe45"
      },
      {
        "test_id": "6c14f199-25d5-45cb-a029-08a5f2094f1c",
        "name": "Checkout process tests",
        "duration": 183,
        "build_id": "456f3e9d-68ef-4e3d-9ae1-f16c5ef0fe45"
      }
    ],
    "testCases": [
      {
        "title": "Valid credentials should login successfully",
        "full_title": "Login functionality Valid credentials should login successfully",
        "timedout": null,
        "duration": 95,
        "state": "passed",
        "speed": "medium",
        "is_pass": true,
        "fail": false,
        "pending": false,
        "testcase_id": "7f07e8a1-9c3b-4922-a283-dce2a10adfc7",
        "test_id": "87b4fba3-fc5b-4b0d-aadf-1c9a926acabe",
        "is_skipped": false,
        "err_message": null
      },
      {
        "title": "Adding item to cart",
        "full_title": "Shopping Cart tests Adding item to cart",
        "timedout": null,
        "duration": 230,
        "state": "passed",
        "speed": "slow",
        "is_pass": true,
        "fail": false,
        "pending": false,
        "testcase_id": "d8f6823e-ae1d-4e45-8c2d-d918ff7c52fd",
        "test_id": "8b3d7c31-4375-432f-8713-f9d64194a0e3",
        "is_skipped": false,
        "err_message": null
      },
      {
        "title": "Searching for products",
        "full_title": "Search functionality Searching for products",
        "timedout": null,
        "duration": 80,
        "state": "pending",
        "speed": null,
        "is_pass": false,
        "fail": false,
        "pending": true,
        "testcase_id": "55c46d6c-6a5f-4398-86a4-d94be1ed0dc3",
        "test_id": "cf03e109-af64-4c08-bf2d-fbfaaf5d8e06",
        "is_skipped": false,
        "err_message": "Not yet implemented"
      },
      {
        "title": "Registration with valid details",
        "full_title": "Registration tests Registration with valid details",
        "timedout": null,
        "duration": 148,
        "state": "passed",
        "speed": "fast",
        "is_pass": true,
        "fail": false,
        "pending": false,
        "testcase_id": "36e32f25-f6a6-4428-896a-8787332949cc",
        "test_id": "4b8d48d2-3f3f-4e99-8979-563d59e4237e",
        "is_skipped": false,
        "err_message": null
      },
      {
        "title": "Completing checkout process",
        "full_title": "Checkout process tests Completing checkout process",
        "timedout": null,
        "duration": 176,
        "state": "failed",
        "speed": null,
        "is_pass": false,
        "fail": true,
        "pending": false,
        "testcase_id": "08c8044a-4268-4092-b5bf-94fe1907bfc2",
        "test_id": "6c14f199-25d5-45cb-a029-08a5f2094f1c",
        "is_skipped": false,
        "err_message": "Expected shipping address not found"
      }
    ]
  }
}

dumpToDatabase(generateSeedData());