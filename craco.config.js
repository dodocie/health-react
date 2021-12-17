module.exports = {
  babel: {
    plugins: [
      [
        'import',
        {
          libraryName: 'react-vant',
          libraryDirectory: 'es',
          style: true,
        },
        'react-vant',
      ],
    ],
  },
  plugins: [
    {
      plugin: require('craco-less'),
      options: {
        noIeCompat: true,
      },
    },
  ],
}
