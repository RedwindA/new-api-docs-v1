import { createOpenAPI } from 'fumadocs-openapi/server';

// OpenAPI schema local paths
export const OPENAPI_PATHS = {
  management: './openapi/api.json',
  aiModel: './openapi/relay.json',
};

export const openapi = createOpenAPI({
  // Set proxy URL to resolve CORS issues
  proxyUrl: '/api/proxy',
  // Use local OpenAPI files with server injection
  input: Object.values(OPENAPI_PATHS),
});
