const requireIcons = require.context('./', false, /\.svg$/);

const IconsUI: Record<string, string> = {};

requireIcons.keys().forEach((fileName: string) => {
  const iconName = fileName.replace('./', '').replace('.svg', '');
  IconsUI[iconName] = fileName.replace('./', './assets/');
});

export default IconsUI;
