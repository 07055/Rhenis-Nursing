// frontend/src/lib/config/config.ts
// Centralized config using environment variables with fallbacks

// -----------------------------------------------------------------------------
// APP INFO
// -----------------------------------------------------------------------------
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "EXAM GEN SYSTEM";
export const APP_TITLE = process.env.NEXT_PUBLIC_APP_TITLE || "EXAM GEN";
export const APP_ACRONYM = process.env.NEXT_PUBLIC_APP_ACRONNYM || "EG";
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION || "Examination Generation System for Nursing Exams";
export const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0";
export const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV || "live";
export const APP_DEBUG = process.env.NEXT_PUBLIC_APP_DEBUG === "true";
export const APP_TIMEZONE = process.env.NEXT_PUBLIC_APP_TIMEZONE || "UTC";
export const APP_LOCALE = process.env.NEXT_PUBLIC_APP_LOCALE || "en";
export const APP_DOMAIN = process.env.NEXT_PUBLIC_APP_DOMAIN || "http://localhost:3000";

// -----------------------------------------------------------------------------
// CONTACT & SOCIAL MEDIA
// -----------------------------------------------------------------------------
export const CONTACT = {
  AREA: process.env.NEXT_PUBLIC_APP_AREA || "",
  ADDRESS: process.env.NEXT_PUBLIC_APP_ADDRESS || "",
  TELLUNO: process.env.NEXT_PUBLIC_APP_TELLUNO || "",
  PHONEUNO: process.env.NEXT_PUBLIC_APP_PHONEUNO || "",
  TELTOS: process.env.NEXT_PUBLIC_APP_TELTOS || "",
  PHONETOS: process.env.NEXT_PUBLIC_APP_PHONETOS || "",
  EMAILUNO: process.env.NEXT_PUBLIC_APP_EMAILUNO || "",
  EMAILTOS: process.env.NEXT_PUBLIC_APP_EMAILTOS || "",
  WHATSAPP: process.env.NEXT_PUBLIC_APP_WHATSAPP || "",
  INSTAGRAM: process.env.NEXT_PUBLIC_APP_INSTAGRAM || "",
  FACEBOOK: process.env.NEXT_PUBLIC_APP_FACEBOOK || "",
  TWITTER: process.env.NEXT_PUBLIC_APP_TWITTER || "",
  LINKEDIN: process.env.NEXT_PUBLIC_APP_LINKEDIN || "",
  TELEGRAM: process.env.NEXT_PUBLIC_APP_TELEGRAM || "",
  TIKTOK: process.env.NEXT_PUBLIC_APP_TIKTOK || "",
  REDDIT: process.env.NEXT_PUBLIC_APP_REDDIT || "",
  YOUTUBE: process.env.NEXT_PUBLIC_APP_YOUTUBE || "",
  PINTEREST: process.env.NEXT_PUBLIC_APP_PINTEREST || "",
  WECHAT: process.env.NEXT_PUBLIC_APP_WECHAT || "",
  DISCORD: process.env.NEXT_PUBLIC_APP_DISCORD || "",
  GITHUB: process.env.NEXT_PUBLIC_APP_GITHUB || "",
  MEDIUM: process.env.NEXT_PUBLIC_APP_MEDIUM || "",
  SNAPCHAT: process.env.NEXT_PUBLIC_APP_SNAPCHAT || "",
  SLACK: process.env.NEXT_PUBLIC_APP_SLACK || "",
  CANONICALLINK: process.env.NEXT_PUBLIC_APP_CANONICALLINK || "",
  DEVELOPER: process.env.NEXT_PUBLIC_APP_DEVELOPER || "",
  DEVLINK: process.env.NEXT_PUBLIC_APP_DEVLINK || "",
  SENDWHATSAPP: process.env.NEXT_PUBLIC_APP_SENDWHATSAPP || "",
};

// -----------------------------------------------------------------------------
// EMAILS CONFIGURATION
// -----------------------------------------------------------------------------
export const EMAILS = {
  SUPPORT: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@examgen.com",
  SYSTEM: process.env.NEXT_PUBLIC_SYSTEM_EMAIL || "support@examgen.com",
  HELP: process.env.NEXT_PUBLIC_HELP_EMAIL || "support@examgen.com",
};

// -----------------------------------------------------------------------------
// PHONE NUMBERS CONFIGURATION
// -----------------------------------------------------------------------------
export const PHONES = {
  TELL: process.env.NEXT_PUBLIC_TELL_PHONE || "",
  SUPPORT: process.env.NEXT_PUBLIC_SUPPORT_PHONE || "",
  HELP: process.env.NEXT_PUBLIC_HELP_PHONE || "",
};

// -----------------------------------------------------------------------------
// BACKEND API CONFIGURATION
// -----------------------------------------------------------------------------
export const BACKEND = {
  ACTIVE: process.env.NEXT_ACTIVE_BACKEND || "fastapi",
  LARAVEL_URL: (process.env.NEXT_PUBLIC_LARAVEL_BASE_URL || "").split(","),
  FASTAPI_URL: (process.env.NEXT_PUBLIC_FASTAPI_BASE_URL || "").split(","),
  DOTNET_URL: (process.env.NEXT_PUBLIC_DOTNET_BASE_URL || "").split(","),
};

// -----------------------------------------------------------------------------
// DEVELOPER INFO
// -----------------------------------------------------------------------------
export const DEVELOPER = {
  NAME: process.env.NEXT_PUBLIC_DEVELOPER_NAME || "",
  PHONE: process.env.NEXT_PUBLIC_DEVELOPER_PHONE || "",
  EMAIL: process.env.NEXT_PUBLIC_DEVELOPER_EMAIL || "",
  WEBSITE: process.env.NEXT_PUBLIC_DEVELOPER_WEBSITE || "",
  GITHUB: process.env.NEXT_PUBLIC_DEVELOPER_GITHUB || "",
};

// -----------------------------------------------------------------------------
// SEO CONFIG
// -----------------------------------------------------------------------------
export const SEO = {
  author: DEVELOPER.NAME || "Exam Gen Team",
  keywords: "Register, Login, Exam Generation, SaaS, Tech, Platform, Cloud, Web Solutions",
  ogImage: `${CONTACT.CANONICALLINK || "https://examgen.com"}/images/og-banner.jpg`,
  siteUrl: CONTACT.CANONICALLINK || "https://examgen.com",
};
