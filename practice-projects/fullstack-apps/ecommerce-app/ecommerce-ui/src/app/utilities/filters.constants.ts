export const FILTER_OPTIONS = ['price', 'category'] as const;
export type FilterOption = (typeof FILTER_OPTIONS)[number];
