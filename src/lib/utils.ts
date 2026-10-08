export interface Experience {
  text: string;
  value: number;
}

export const calculateExperience = (start: string): Experience => {
  const now = new Date();
  const startDate = new Date(start);
  const totalMonths =
    (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());
  const text = `${Math.floor(totalMonths / 12)} years and ${totalMonths % 12} months`;
  return { text, value: totalMonths };
};

// calculate time difference between two dates in years and months
export const calculatePastExperience = (start: string, end: string): Experience => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const totalMonths =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());
  const text = `${Math.floor(totalMonths / 12)} years and ${totalMonths % 12} months`;
  return { text, value: totalMonths };
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Frontmatter dates reach components as ISO strings or Date objects depending on how they
// were serialised. Reading them in UTC keeps the prerendered day and the hydrated day equal.
export const formatDate = (date: string | Date, withYear = true): string => {
  const parsed = new Date(date);
  const day = `${parsed.getUTCDate()} ${MONTHS[parsed.getUTCMonth()]}`;
  return withYear ? `${day} ${parsed.getUTCFullYear()}` : day;
};

export const isoDate = (date: string | Date): string => new Date(date).toISOString().slice(0, 10);
