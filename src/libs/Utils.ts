export const urlValidate = (str: string): boolean => {
    try {
      return !!new URL(str);
    }
    catch (_) {
      return false;
    }
};

export const stringCutter = (str: string, max: number): string => {
  return (str.length > max) ? (str.slice(0, max) + '..') : (str);
}

type voidFunc = () => void

export const linkWindowHandle = (link: string): voidFunc  => {
  return () => { window.open(link, "_blank", "noopener,noreferrer") };
}