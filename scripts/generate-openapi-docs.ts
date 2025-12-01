import { generateFiles, type OperationOutput } from 'fumadocs-openapi';
import { createOpenAPI } from 'fumadocs-openapi/server';
import { OPENAPI_URLS } from '../src/lib/openapi';
import { aiModelTagMapping, managementTagMapping } from './tag-mapping';

// Type for OpenAPI operation object
interface OperationObject {
  tags?: string[];
  operationId?: string;
  description?: string;
  summary?: string;
  [key: string]: unknown;
}

interface PathItemObject {
  description?: string;
  [key: string]: unknown;
}

/**
 * Convert a tag path to English folder path
 * Handles nested tags like "视频生成/Kling格式" -> "video-generation/kling"
 */
function convertTagToEnglish(
  tag: string,
  mapping: Record<string, string>
): string {
  // Split by / to handle nested tags
  const parts = tag.split('/');
  const convertedParts = parts.map((part) => mapping[part] || part);
  return convertedParts.join('/');
}

/**
 * Convert camelCase to kebab-case
 * e.g., "createMessage" -> "create-message"
 *       "createChatCompletion" -> "create-chat-completion"
 *       "listModelsGemini" -> "list-models-gemini"
 */
function camelToKebab(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

async function generate() {
  // Generate AI Model API docs with custom path control
  await generateFiles({
    input: createOpenAPI({ input: [OPENAPI_URLS.aiModel] }),
    output: './content/docs/zh/api/ai-model',
    per: 'custom',
    includeDescription: true,
    addGeneratedComment: true,
    toPages(builder) {
      const items = builder.extract();

      for (const op of items.operations) {
        const extracted = builder.fromExtractedOperation(op);
        if (!extracted) continue;

        const pathItem = extracted.pathItem as unknown as PathItemObject;
        const operation = extracted.operation as unknown as OperationObject;
        const { displayName } = extracted;

        const tag = operation.tags?.[0] || 'default';
        const englishTag = convertTagToEnglish(tag, aiModelTagMapping);
        const operationId =
          operation.operationId ||
          `${op.path.replace(/\//g, '-').replace(/^-/, '')}-${op.method}`;
        // Convert camelCase operationId to kebab-case for consistent file naming
        const fileName = camelToKebab(operationId);

        const entry: OperationOutput = {
          type: 'operation',
          schemaId: builder.id,
          item: op,
          path: `${englishTag}/${fileName}.mdx`,
          info: {
            title: displayName,
            description: operation.description || pathItem.description,
          },
        };

        builder.create(entry);
      }
    },
  });
  console.log('✅ AI Model API docs generated!');

  // Generate Management API docs with custom path control
  await generateFiles({
    input: createOpenAPI({ input: [OPENAPI_URLS.management] }),
    output: './content/docs/zh/api/management',
    per: 'custom',
    includeDescription: true,
    addGeneratedComment: true,
    toPages(builder) {
      const items = builder.extract();

      for (const op of items.operations) {
        const extracted = builder.fromExtractedOperation(op);
        if (!extracted) continue;

        const pathItem = extracted.pathItem as unknown as PathItemObject;
        const operation = extracted.operation as unknown as OperationObject;
        const { displayName } = extracted;

        const tag = operation.tags?.[0] || 'default';
        const englishTag = convertTagToEnglish(tag, managementTagMapping);
        // Convert route path to simple file name
        const fileName = op.path
          .replace(/^\/api\//, '')
          .replace(/\/+$/, '')
          .replace(/\//g, '-')
          .replace(/[{}]/g, '')
          .replace(/^-/, '');

        const entry: OperationOutput = {
          type: 'operation',
          schemaId: builder.id,
          item: op,
          path: `${englishTag}/${fileName}-${op.method}.mdx`,
          info: {
            title: displayName,
            description: operation.description || pathItem.description,
          },
        };

        builder.create(entry);
      }
    },
  });
  console.log('✅ Management API docs generated!');
}

generate()
  .then(() => console.log('✅ All done!'))
  .catch((err) => {
    console.error('❌ Failed:', err);
    process.exit(1);
  });
