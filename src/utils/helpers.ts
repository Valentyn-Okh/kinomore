export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const getYear = (date: string): string => {
  return new Date(date).getFullYear().toString();
};

export const formatRuntime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}год ${mins}хв`;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const getRatingColor = (rating: number): string => {
  if (rating >= 8) return 'text-green-500';
  if (rating >= 6) return 'text-yellow-500';
  if (rating >= 4) return 'text-orange-500';
  return 'text-red-500';
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const isFavorite = (favorites: number[], id: number): boolean => {
  return favorites.includes(id);
};

export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
};

export const sortByDate = <T>(array: T[], key: keyof T, ascending: boolean = true): T[] => {
  return [...array].sort((a, b) => {
    const dateA = new Date(String(a[key])).getTime();
    const dateB = new Date(String(b[key])).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
};