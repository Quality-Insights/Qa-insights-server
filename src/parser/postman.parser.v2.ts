import { randomUUID } from 'crypto';

export function preparePostmanResultV2(result: any) {
  let tests = [];
  let testCases = [];

  let testFailureCount = 0;

  const build_id = randomUUID();

  for (let test of result.run?.executions) {
    const currentTestCases = [];
    let testCaseFailed = false;
    for (let testCase of test?.assertions || []) {
      if (testCase?.error) testCaseFailed = true;

      currentTestCases.push(
        {
          title: `${testCase.assertion}`,
          full_title: `${testCase.assertion}`,
          is_pass: `${testCase.error ? false : true}`,
          testcase_id: `${randomUUID()}`,
          test_id: `${test?.item?.id}`
        }
      );
    };

    if (testCaseFailed) testFailureCount++;

    testCases.push(...currentTestCases);

    tests.push(
      {
        test_id: randomUUID(),
        name: test?.item?.name,
        duration: `${test?.response?.responseTime}`,
        build_id: build_id,
        url: `/${(test?.request?.url?.path).join('/')}`,
        responsecode_status: test?.response?.code
      }
    );
  }

  const build = {
    build_id: build_id,
    folder_id: null,
    environment_id: `${result.environment?.id}`,
    delay: null,
    persist: null,
    status: null,
    startdatetime: `${new Date(result.run?.timings?.started)}`,
    duration: `${result.run?.timings?.completed - result.run?.timings?.started}`,
    tescount: `${result.run?.stats?.items?.total}`,
    passescount: `${result.run?.stats?.items?.total - testFailureCount}`,
    failurecount: `${testFailureCount}`,
    buildtype: "postman"
  };

  return {
    buildStats: build,
    tests: tests,
    testCases: testCases
  };
}
