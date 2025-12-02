/**
 * Tag name mapping from Chinese to English folder names
 * This allows us to use English paths in URLs while keeping the original Chinese tags in OpenAPI specs
 */

// AI Model API tags (exact match with OpenAPI spec tag names from relay.json)
export const aiModelTagMapping: Record<string, string> = {
  // Main category tags (parent parts when split by /)
  '模型（Models）': 'models',
  '聊天（Chat）': 'chat',
  '补全（Completions）': 'completions',
  '图像（Images）': 'images',
  '视频（Videos）': 'videos',
  '音频（Audio）': 'audio',
  '实时语音（Realtime）': 'realtime',
  '嵌入（Embeddings）': 'embeddings',
  '重排序（Rerank）': 'rerank',
  '审查（Moderations）': 'moderations',
  '未实现（Unimplemented）': 'unimplemented',

  // Sub-category tags (child parts when split by /)
  列出模型: 'list',
  原生OpenAI格式: 'openai',
  通义千问OpenAI格式: 'qwen',
  原生Gemini格式: 'gemini',
  Sora格式: 'sora',
  可灵格式: 'kling',
  即梦格式: 'jimeng',
  '微调（Fine-tuning）': 'fine-tuning',
  '文件（Files）': 'files',

  // Full path tags (for direct matching)
  '模型（Models）/列出模型': 'models/list',
  '聊天（Chat）/原生OpenAI格式': 'chat/openai',
  '图像（Images）/原生OpenAI格式': 'images/openai',
  '图像（Images）/通义千问OpenAI格式': 'images/qwen',
  '图像（Images）/原生Gemini格式': 'images/gemini',
  '视频（Videos）/Sora格式': 'videos/sora',
  '视频（Videos）/可灵格式': 'videos/kling',
  '视频（Videos）/即梦格式': 'videos/jimeng',
  '音频（Audio）/原生OpenAI格式': 'audio/openai',
  '未实现（Unimplemented）/微调（Fine-tuning）': 'unimplemented/fine-tuning',
  '未实现（Unimplemented）/文件（Files）': 'unimplemented/files',
};

// Management API tags (exact match with OpenAPI spec tag names from api.json)
export const managementTagMapping: Record<string, string> = {
  系统: 'system',
  系统设置: 'system-settings',
  用户登陆注册: 'user-auth',
  用户管理: 'user-management',
  两步验证: 'two-factor-auth',
  安全验证: 'security-verification',
  OAuth: 'oauth',
  渠道管理: 'channel-management',
  模型管理: 'model-management',
  令牌管理: 'token-management',
  兑换码: 'redemption',
  充值: 'payment',
  日志: 'logs',
  数据统计: 'statistics',
  分组: 'groups',
  任务: 'tasks',
  供应商: 'vendors',
};

// Combined mapping
export const allTagMapping: Record<string, string> = {
  ...aiModelTagMapping,
  ...managementTagMapping,
};

/**
 * Localized titles for each tag in different languages
 */
export const tagTitles: Record<string, Record<string, string>> = {
  // AI Model API - Main categories
  models: {
    en: 'Models',
    zh: '模型',
    ja: 'モデル',
  },
  list: {
    en: 'List Models',
    zh: '列出模型',
    ja: 'モデル一覧',
  },
  chat: {
    en: 'Chat',
    zh: '聊天',
    ja: 'チャット',
  },
  openai: {
    en: 'OpenAI Format',
    zh: '原生OpenAI格式',
    ja: 'OpenAI形式',
  },
  completions: {
    en: 'Completions',
    zh: '补全',
    ja: '補完',
  },
  images: {
    en: 'Images',
    zh: '图像',
    ja: '画像',
  },
  qwen: {
    en: 'Qwen Format',
    zh: '通义千问格式',
    ja: 'Qwen形式',
  },
  gemini: {
    en: 'Gemini Format',
    zh: 'Gemini格式',
    ja: 'Gemini形式',
  },
  videos: {
    en: 'Videos',
    zh: '视频',
    ja: '動画',
  },
  sora: {
    en: 'Sora Format',
    zh: 'Sora格式',
    ja: 'Sora形式',
  },
  kling: {
    en: 'Kling Format',
    zh: '可灵格式',
    ja: '可灵形式',
  },
  jimeng: {
    en: 'Jimeng Format',
    zh: '即梦格式',
    ja: 'Jimeng形式',
  },
  audio: {
    en: 'Audio',
    zh: '音频',
    ja: '音声',
  },
  realtime: {
    en: 'Realtime',
    zh: '实时语音',
    ja: 'リアルタイム',
  },
  embeddings: {
    en: 'Embeddings',
    zh: '嵌入',
    ja: '埋め込み',
  },
  rerank: {
    en: 'Rerank',
    zh: '重排序',
    ja: 'リランク',
  },
  moderations: {
    en: 'Moderations',
    zh: '审查',
    ja: 'モデレーション',
  },
  unimplemented: {
    en: 'Unimplemented',
    zh: '未实现',
    ja: '未実装',
  },
  'fine-tuning': {
    en: 'Fine-tuning',
    zh: '微调',
    ja: 'ファインチューニング',
  },
  files: {
    en: 'Files',
    zh: '文件',
    ja: 'ファイル',
  },
  // Management API
  system: {
    en: 'System',
    zh: '系统',
    ja: 'システム',
  },
  'system-settings': {
    en: 'System Settings',
    zh: '系统设置',
    ja: 'システム設定',
  },
  'user-auth': {
    en: 'User Authentication',
    zh: '用户登陆注册',
    ja: 'ユーザー認証',
  },
  'user-management': {
    en: 'User Management',
    zh: '用户管理',
    ja: 'ユーザー管理',
  },
  'two-factor-auth': {
    en: 'Two-Factor Authentication',
    zh: '两步验证',
    ja: '二要素認証',
  },
  'security-verification': {
    en: 'Security Verification',
    zh: '安全验证',
    ja: 'セキュリティ検証',
  },
  oauth: {
    en: 'OAuth',
    zh: 'OAuth',
    ja: 'OAuth',
  },
  'channel-management': {
    en: 'Channel Management',
    zh: '渠道管理',
    ja: 'チャネル管理',
  },
  'model-management': {
    en: 'Model Management',
    zh: '模型管理',
    ja: 'モデル管理',
  },
  'token-management': {
    en: 'Token Management',
    zh: '令牌管理',
    ja: 'トークン管理',
  },
  redemption: {
    en: 'Redemption',
    zh: '兑换码',
    ja: '引き換えコード',
  },
  payment: {
    en: 'Payment',
    zh: '充值',
    ja: '支払い',
  },
  logs: {
    en: 'Logs',
    zh: '日志',
    ja: 'ログ',
  },
  statistics: {
    en: 'Statistics',
    zh: '数据统计',
    ja: '統計',
  },
  groups: {
    en: 'Groups',
    zh: '分组',
    ja: 'グループ',
  },
  tasks: {
    en: 'Tasks',
    zh: '任务',
    ja: 'タスク',
  },
  vendors: {
    en: 'Vendors',
    zh: '供应商',
    ja: 'ベンダー',
  },
};

/**
 * Convert a Chinese tag name to English folder name
 */
export function toEnglishFolderName(chineseTag: string): string {
  return allTagMapping[chineseTag] || chineseTag;
}

/**
 * Get localized title for a tag
 */
export function getTagTitle(englishTag: string, lang: string): string {
  return tagTitles[englishTag]?.[lang] || englishTag;
}
