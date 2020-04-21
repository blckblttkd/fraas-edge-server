export const isDeployed = process.env.NODE_ENV !== 'local';
export const isProduction = process.env.NODE_ENV === 'production';
