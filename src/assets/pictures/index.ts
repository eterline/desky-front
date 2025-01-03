const requireIcons = require.context('./', false, /\.jpg$/);

const Pictures: Record<string, string> = {};

requireIcons.keys().forEach((fileName: string) => {
  const pictureName = fileName.replace('./', '').replace('.jpg', '');
  
  Pictures[pictureName] = fileName.replace('./', './assets/');
});

export default Pictures;