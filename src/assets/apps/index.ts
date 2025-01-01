const requireIcons = require.context('./', false, /\.svg$/);

const AppsIcons: Record<string, string> = {};

requireIcons.keys().forEach((fileName: string) => {
  const iconName = fileName.replace('./', '').replace('.svg', '');
  AppsIcons[iconName] = fileName.replace('./', './assets/');
});

export default AppsIcons;
