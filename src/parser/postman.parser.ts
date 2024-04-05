import { randomUUID } from 'crypto';

export function preparePostmanResult(result: any) {
  const build = {
    buildid: result.id,
    startdatetime: result.startedAt,
    enddatetime: null,
    duration: result.totalTime,
    suitescount: null,
    testcount: result.results.length,
    passescount: result.totalPass,
    pendingcount: null,
    failurecount: result.totalFail,
    testregisteredcount: null,
    passpercent: JSON.stringify((result.totalPass / (result.totalPass + result.totalFail)) * 100),
    pendingpercent: null,
    skippedcount: null,
    buildtype: "postman"
  }

  let tests = [];
  let testCases = [];

  for (let test of result.results) {
    const testCasesKeys = Object.keys(test.tests);

    const currentTestCases = [];

    for (let testCaseKey of testCasesKeys) {
      currentTestCases.push(
        {
          title: testCaseKey,
          full_title: testCaseKey,
          timedout: null,
          duration: null,
          state: test.tests[testCaseKey],
          speed: null,
          is_pass: test.tests[testCaseKey],
          fail: test.tests[testCaseKey],
          pending: null,
          testcase_uuid: randomUUID(),
          test_uuid: test.id,
          is_skipped: null,
          err_message: null
        }
      );
    };

    testCases.push(...currentTestCases);

    tests.push(
      {
        uuid: test.id,
        title: test.name,
        fullfile: null,
        file: null,
        beforehook: null,
        afterhook: null,
        suites: null,
        passes: currentTestCases.filter(testCase => testCase.is_pass === true).length,
        failure: currentTestCases.filter(testCase => testCase.is_pass !== true).length,
        pending: null,
        duration: test.time,
        root: null,
        rootempty: null,
        buildid: build.buildid,
        url: test.url
      }
    );
  }

  return {
    build: build,
    tests: tests,
    testCases: testCases
  };
}
