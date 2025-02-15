const requireIcons = require.context('./', false, /\.jpg$/);

const PictureMap: Record<string, string> = {};

requireIcons.keys().forEach((fileName: string) => {
  const pictureName = fileName.replace('./', '').replace('.jpg', '');
  
  PictureMap[pictureName] = fileName.replace('./', './assets/');
});

export default PictureMap;