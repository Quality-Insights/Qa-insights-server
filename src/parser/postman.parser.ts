import { randomUUID } from 'crypto';

export function preparePostmanResult(result: any) {
  const build = {
    build_id: `${result.id}`,
    folder_id: `${result.folder_id}`,
    environment_id: `${result.environment_id}`,
    delay: `${result.delay}`,
    persist: `${result.persist}`,
    status: `${result.status}`,
    startdatetime: `${result.startedAt}`,
    duration: `${result.totalTime}`,
    tescount: `${result.results.length}`,
    passescount: `${result.totalPass}`,
    failurecount: `${result.totalFail}`,
    passpercent: `${JSON.stringify((result.totalPass / (result.totalPass + result.totalFail)) * 100)}`,
    buildtype: "postman"
  };


  let tests = [];
  let testCases = [];

  for (let test of result.results) {
    const testCasesKeys = Object.keys(test.tests);

    const currentTestCases = [];

    for (let testCaseKey of testCasesKeys) {
      currentTestCases.push(
        {
          title: `${testCaseKey}`,
          full_title: `${testCaseKey}`,
          is_pass: `${test.tests[testCaseKey]}`, // Assuming test.tests[testCaseKey] returns a boolean
          testcase_id: `${randomUUID()}`,
          test_id: `${test.id}`
        }
      );
    };

    testCases.push(...currentTestCases);

    tests.push(
      {
        test_id: test.id,
        name: test.name,
        duration: test.time,
        build_id: build.build_id,
        url: test.url,
        responsecode_status: test.responseCode.code,
      }
    );
  }

  return {
    buildStats: build,
    tests: tests,
    testCases: testCases
  };
}
