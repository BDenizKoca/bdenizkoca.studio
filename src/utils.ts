import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';
import { copy } from './config/copy';

// Type definitions
export type Language = 'en' | 'tr';
export type CollectionName = 'projects' | 'notes';

// Locale helpers
export function getLocaleFromPath(pathname: string): Language {
  return pathname.startsWith('/tr/') || pathname.startsWith('/tr') ? 'tr' : 'en';
}

export function getAlternateLocale(locale: Language): Language {
  return locale === 'en' ? 'tr' : 'en';
}

export function getCopyBundle(lang: Language) {
  return copy[lang];
}

export function getLocalePaths(lang: Language) {
  return {
    home: lang === 'en' ? '/' : '/tr/',
    projects: lang === 'en' ? '/projects/' : '/tr/projeler/',
    notes: lang === 'en' ? '/notes/' : '/tr/notlar/',
    about: lang === 'en' ? '/me/' : '/tr/ben/',
    projectsSlug: (slug: string) => {
      const baseSlug = slug.replace(/^(en|tr)\//, '');
      return lang === 'en' ? `/projects/${baseSlug}/` : `/tr/projeler/${baseSlug}/`;
    },
    notesSlug: (slug: string) => {
      const baseSlug = slug.replace(/^(en|tr)\//, '');
      return lang === 'en' ? `/notes/${baseSlug}/` : `/tr/notlar/${baseSlug}/`;
    }
  };
}

// Collection helpers
export async function getLocalizedCollection<T extends CollectionName>(
  collection: T,
  lang: Language
): Promise<CollectionEntry<T>[]> {
  const allEntries = await getCollection(collection);
  return allEntries.filter(entry => entry.data.lang === lang) as CollectionEntry<T>[];
}

export async function getFeaturedContent<T extends CollectionName>(
  collection: T,
  lang: Language
): Promise<CollectionEntry<T>[]> {
  const entries = await getLocalizedCollection(collection, lang);
  return entries.filter(entry => entry.data.show_on_homepage);
}

// Date formatting
export function formatDateShort(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  return `${day}.${month}.${year}`;
}

export function formatDate(date: Date, lang: Language = 'en', style: 'long' | 'short' = 'long'): string {
  const locale = lang === 'tr' ? 'tr-TR' : 'en-US';
  const monthStyle = style === 'short' ? 'short' : 'long';
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: monthStyle,
    day: 'numeric'
  }).format(date);
}

// Slug helpers
export function getAltLangSlug(
  collection: CollectionEntry<'projects' | 'notes'>[],
  slug: string,
  lang: Language
): string | undefined {
  // First, find the current entry
  const currentEntry = collection.find(entry => entry.slug === slug);
  if (!currentEntry) return undefined;

  // Extract base slug (remove language prefix like 'en/' or 'tr/')
  const baseSlug = slug.replace(/^(en|tr)\//, '');

  // Get alternate language
  const altLang = lang === 'en' ? 'tr' : 'en';

  // Find entry in alternate language
  // Check both the default slug pattern (e.g., 'tr/tideflow') AND custom slug overrides (e.g., 'tideflow')
  const altEntry = collection.find(entry => {
    if (entry.data.lang !== altLang) return false;

    // Check if it matches the expected pattern
    const expectedSlug = `${altLang}/${baseSlug}`;
    if (entry.slug === expectedSlug) return true;

    // Also check if it has a custom slug override that matches the base slug
    if (entry.data.slug === baseSlug) return true;

    // Or if the entry slug itself matches the baseSlug (for files with slug overrides)
    if (entry.slug === baseSlug) return true;

    return false;
  });

  return altEntry?.slug;
}

// Sorting helpers
export function sortProjectsByOrderAndDate<T extends { data: { order?: number; date: Date } }>(
  projects: T[]
): T[] {
  return projects.sort((a, b) => {
    const orderA = a.data.order ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.data.order ?? Number.MAX_SAFE_INTEGER;
    if (orderA !== orderB) return orderA - orderB;
    return b.data.date.valueOf() - a.data.date.valueOf();
  });
}

export function sortByDateDesc<T extends { data: { date: Date } }>(items: T[]): T[] {
  return items.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}