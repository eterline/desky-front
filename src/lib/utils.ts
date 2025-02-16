export interface URLvalidation {
  ok: boolean
  text: string
}

export const urlValidate = (str: string): URLvalidation => {
    try {
      const url = new URL(str).toString()
      return {ok: true, text: url};
    }
    catch (_) {
      return {ok: false, text: str};
    }
};

export const stringCutter = (str: string, max: number): string => {
  return (str.length > max) ? (str.slice(0, max) + '..') : (str);
}

type voidFunc = () => void

export const linkWindowHandle = (link: string): voidFunc  => {
  return () => { window.open(link, "_blank", "noopener,noreferrer") };
}

export const SecToHHMMSS = (sec: number): string => {
  var hours   = Math.floor(sec / 3600);
  var minutes = Math.floor((sec - (hours * 3600)) / 60);
  var seconds = sec - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = 0+hours;}
  if (minutes < 10) {minutes = 0+minutes;}
  if (seconds < 10) {seconds = 0+seconds;}

  return hours+'H '+minutes+'M '+seconds+'S';
}

export const bytesToGB = (b: number, after?: number): string =>{
  return `${(b / Math.pow(10,9)).toFixed(after ?? 0)} GB`
}

export const percentString = (b: number, after?: number): string =>{
  return `${b.toFixed(after ?? 0)}%`
}

export const loadColorRGB = (load: number, max?: number): string => {

  const m = max ?? 100

  const l = Math.min(m, Math.max(0, load));

  const green = Math.round(255 * (1 - l / m));
  const red = Math.round(255 * (l / m));

  return `rgb(${red} ${green} 0 )`
}