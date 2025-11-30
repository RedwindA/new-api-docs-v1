'use client';

import { Banner } from 'fumadocs-ui/components/banner';
import Link from 'next/link';
import type { ComponentProps } from 'react';

// ============================================
// Banner 配置 - 修改这里即可更新 banner 内容
// ============================================
const BANNER_CONFIG = {
  // banner 唯一标识，用于记住用户是否关闭过
  id: 'docs-renewal-notice',

  // banner 样式: 'rainbow' | 'normal'
  variant: 'rainbow' as const,

  // 链接地址
  linkUrl: 'https://doc.newapi.pro',

  // 多语言文本配置
  text: {
    en: {
      message: 'Documentation renewed! For old docs, visit',
      linkText: 'doc.newapi.pro',
    },
    zh: {
      message: '文档焕新，旧文档请访问',
      linkText: 'doc.newapi.pro',
    },
    ja: {
      message: 'ドキュメントが一新されました！旧ドキュメントは',
      linkText: 'doc.newapi.pro',
    },
  } as Record<string, { message: string; linkText: string }>,
};
// ============================================

type BannerVariant = ComponentProps<typeof Banner>['variant'];

export function GlobalBanner({ lang }: { lang?: string }) {
  const { id, variant, linkUrl, text } = BANNER_CONFIG;
  const content = text[lang || 'en'] || text.en;

  return (
    <Banner id={id} variant={variant as BannerVariant}>
      <span className="text-center">
        {content.message}{' '}
        <Link
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-fd-primary inline-flex font-semibold whitespace-nowrap underline underline-offset-2"
        >
          {content.linkText}
        </Link>
      </span>
    </Banner>
  );
}
