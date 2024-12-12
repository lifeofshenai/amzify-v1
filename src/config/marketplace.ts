import type { AmazonConfig } from '../services/marketplace/types';

const getEnvVar = (key: string): string | undefined => {
  const env = import.meta.env;
  return env[key] as string | undefined;
};

export const marketplaceConfig = {
  amazon: {
    region: getEnvVar('VITE_AMAZON_SP_API_REGION') || 'NA',
    accessKey: getEnvVar('VITE_AMAZON_SP_API_ACCESS_KEY'),
    secretKey: getEnvVar('VITE_AMAZON_SP_API_SECRET_KEY'),
    roleArn: getEnvVar('VITE_AMAZON_SP_API_ROLE_ARN'),
    refreshToken: getEnvVar('VITE_AMAZON_SP_API_REFRESH_TOKEN'),
    marketplaceId: getEnvVar('VITE_AMAZON_MARKETPLACE_ID'),
  } as AmazonConfig,
};