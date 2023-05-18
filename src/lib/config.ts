const getEnvironmentVariable = (environmentVariable: string): string => {
  const unvalidatedEnvironmentVariable = process.env[environmentVariable];
  if (!unvalidatedEnvironmentVariable) {
    throw new Error(
      `Couldn't find environment variable: ${environmentVariable}`
    );
  } else {
    return unvalidatedEnvironmentVariable;
  }
};

export const config = {
  upstashUrl: getEnvironmentVariable('UPSTASH_REDIS_REST_URL'),
  upstashToken: getEnvironmentVariable('UPSTASH_REDIS_REST_TOKEN'),
};
