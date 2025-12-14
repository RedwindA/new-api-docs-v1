import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { i18n } from '@/lib/i18n';
import { baseUrl } from '@/lib/metadata';

/**
 * Generate sitemap with:
 * - Multi-language alternates (hreflang) for SEO
 * - Actual lastModified dates from page data
 * - Proper priority hierarchy
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const url = baseUrl.origin;

  // Helper to generate language alternates for a path
  function generateAlternates(path: string): Record<string, string> {
    const alternates: Record<string, string> = {};
    for (const lang of i18n.languages) {
      alternates[lang] = `${url}/${lang}${path}`;
    }
    // Add x-default pointing to default language
    alternates['x-default'] = `${url}/${i18n.defaultLanguage}${path}`;
    return alternates;
  }

  // Add homepage for each language with alternates
  for (const lang of i18n.languages) {
    entries.push({
      url: `${url}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: generateAlternates(''),
      },
    });
  }

  // Create a map to group pages by slug across languages
  const pagesBySlug = new Map<
    string,
    { lang: string; page: ReturnType<typeof source.getPages>[number] }[]
  >();

  // Collect all pages grouped by slug
  for (const lang of i18n.languages) {
    const pages = source.getPages(lang);
    for (const page of pages) {
      const slugKey = page.slugs.join('/');
      if (!pagesBySlug.has(slugKey)) {
        pagesBySlug.set(slugKey, []);
      }
      pagesBySlug.get(slugKey)!.push({ lang, page });
    }
  }

  // Add docs pages with proper alternates and lastModified
  for (const [slugKey, langPages] of pagesBySlug) {
    for (const { lang, page } of langPages) {
      // Each language version should use its own lastModified.
      const lm = page.data.lastModified;
      const lastModified = lm ? (lm instanceof Date ? lm : new Date(lm)) : null;

      // Determine priority based on page depth
      const depth = page.slugs.length;
      let priority: number;
      if (depth === 1) {
        priority = 0.9; // Top-level pages (e.g., /docs/guide)
      } else if (depth === 2) {
        priority = 0.8; // Second-level pages
      } else {
        priority = 0.7; // Deeper pages
      }

      // Determine change frequency based on page type
      const isApiPage = page.slugs[0] === 'api';
      const changeFrequency: 'daily' | 'weekly' | 'monthly' = isApiPage
        ? 'monthly'
        : 'weekly';

      entries.push({
        url: `${url}/${lang}/docs/${slugKey}`,
        ...(lastModified ? { lastModified } : {}),
        changeFrequency,
        priority,
        alternates: {
          languages: generateAlternates(`/docs/${slugKey}`),
        },
      });
    }
  }

  return entries;
}
