module.exports = {
  presets: [
    ['@babel/preset-env', {
      shippedProposals: true,
      useBuiltIns: 'usage',
      corejs: 3,
      targets: {
        node: '10.16',
        browsers: [],
      },
    }],
  ],
};
