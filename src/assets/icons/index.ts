const requireIcons = require.context('./', false, /\.svg$/);

const IconMapUI: Record<string, string> = {};

requireIcons.keys().forEach((fileName: string) => {
  const iconName = fileName.replace('./', '').replace('.svg', '');
  
  IconMapUI[iconName] = fileName.replace('./', './assets/');
});

export default IconMapUI;
