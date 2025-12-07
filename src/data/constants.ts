export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export type Month = (typeof MONTHS)[number];

export const MONTHS_COUNT = MONTHS.length;

export const DEFAULTS = {
  OVERVIEW_VALUE: 0,
  PROJECT_TOTAL_VALUE: 0,
  ROW_VALUE: 0,
  ROW_CHECKED: false,
} as const;

export const REGIONS = [
  "Europe",
  "North America",
  "Asia Pacific",
  "Latin America",
] as const;
export type Region = (typeof REGIONS)[number];
