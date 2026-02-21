module.exports = {
  packagerConfig: {
    name: 'Hybadge Maker',
  },
  makers: [
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin', 'win32']
    }
  ]
};
