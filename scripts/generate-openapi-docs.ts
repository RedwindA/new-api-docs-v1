import { generateFiles } from 'fumadocs-openapi';
import { createOpenAPI } from 'fumadocs-openapi/server';

// AI Model API (relay.json)
const relayAPI = createOpenAPI({
  input: [
    'https://raw.githubusercontent.com/QuantumNous/new-api/refs/heads/main/docs/openapi/relay.json',
  ],
});

// Management API (api.json)
const managementAPI = createOpenAPI({
  input: [
    'https://raw.githubusercontent.com/QuantumNous/new-api/refs/heads/main/docs/openapi/api.json',
  ],
});

async function generate() {
  // Generate AI Model API - each operation as separate file, grouped by tag
  await generateFiles({
    input: relayAPI,
    output: './content/docs/zh/api/ai-model',
    per: 'operation',
    groupBy: 'tag',
    includeDescription: true,
    addGeneratedComment: true,
  });
  console.log('✅ AI Model API docs generated!');

  // Generate Management API - each operation as separate file, grouped by tag
  await generateFiles({
    input: managementAPI,
    output: './content/docs/zh/api/management',
    per: 'operation',
    groupBy: 'tag',
    includeDescription: true,
    addGeneratedComment: true,
    // Simplify file names since api.json doesn't have operationId
    name(output) {
      if (output.type !== 'operation') return output.path;
      // Convert route path to simple file name
      // e.g., /api/about -> about, /api/user/login -> user-login
      const path = output.item.path
        .replace(/^\/api\//, '') // Remove /api/ prefix
        .replace(/\/+$/, '') // Remove trailing slashes to avoid double dashes
        .replace(/\//g, '-') // Replace remaining slashes with dashes
        .replace(/[{}]/g, ''); // Remove path parameter brackets
      return `${path}-${output.item.method}`;
    },
  });
  console.log('✅ Management API docs generated!');
}

generate()
  .then(() => {
    console.log('✅ All OpenAPI docs generated!');
  })
  .catch((err) => {
    console.error('❌ Generation failed:', err);
    process.exit(1);
  });
