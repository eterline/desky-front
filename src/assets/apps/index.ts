const requireIcons = require.context('./', false, /\.svg$/);

const IconMapApps: Record<string, string> = {};

requireIcons.keys().forEach((fileName: string) => {
  const iconName = fileName.replace('./', '').replace('.svg', '');
  IconMapApps[iconName] = fileName.replace('./', './assets/');
});

export default IconMapApps;
