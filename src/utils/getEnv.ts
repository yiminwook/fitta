export const getEnv = (environment: string): string => {
  const env = process.env[environment];
  if (!env) throw new Error(`${environment} can't find`);
  return env;
};
