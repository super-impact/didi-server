export const removeQueryString = (url: string): string => {
  return url.split('?')[0];
};
