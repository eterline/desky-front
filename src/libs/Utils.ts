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

export const SecToHHMMSSString = (sec: number): string => {
  var hours   = Math.floor(sec / 3600);
  var minutes = Math.floor((sec - (hours * 3600)) / 60);
  var seconds = sec - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = 0+hours;}
  if (minutes < 10) {minutes = 0+minutes;}
  if (seconds < 10) {seconds = 0+seconds;}

  return hours+'H '+minutes+'M '+seconds+'S';
}