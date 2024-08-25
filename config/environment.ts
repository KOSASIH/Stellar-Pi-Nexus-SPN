export interface EnvironmentConfig {
  development: boolean;
  production: boolean;
}

export const environment: EnvironmentConfig = {
  development: process.env.NODE_ENV !== 'production',
  production: process.env.NODE_ENV === 'production'
};
