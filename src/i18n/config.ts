export type Locale = (typeof locales)[number];

export const locales = ["en-US", "es-ES", "pt-BR"] as const;
export const defaultLocale: Locale = "pt-BR";
