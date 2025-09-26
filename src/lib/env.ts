// Environment configuration utilities
export const ENV = {
  PORT: import.meta.env.PUBLIC_PORT || '3180',
  DOMAIN: import.meta.env.PUBLIC_DOMAIN || 'pollytalkie.com',
  NODE_ENV: import.meta.env.NODE_ENV || 'development',
  PROD: import.meta.env.PROD,
  DEV: import.meta.env.DEV,
} as const;

// Determine if we're in local development
export const isLocal = () => {
  return ENV.DEV || ENV.DOMAIN.includes('.local');
};

// Get the protocol based on environment
export const getProtocol = () => {
  return isLocal() ? 'http:' : 'https:';
};

// Get the website base URL
export const getWebsiteUrl = () => {
  const protocol = getProtocol();
  return `${protocol}//www.${ENV.DOMAIN}`;
};

// Get the portal base URL
export const getPortalUrl = () => {
  const protocol = getProtocol();
  return `${protocol}//app.${ENV.DOMAIN}`;
};

// Get specific portal URLs
export const getPortalUrls = () => {
  const baseUrl = getPortalUrl();
  
  return {
    base: baseUrl,
    signin: `${baseUrl}/signin`,
    signup: `${baseUrl}/signup`,
    dashboard: `${baseUrl}/dashboard`,
    pricing: `${baseUrl}/pricing`,
    profile: `${baseUrl}/profile`,
  };
};

// Export commonly used URLs
export const URLS = {
  website: getWebsiteUrl(),
  portal: getPortalUrls(),
} as const;
