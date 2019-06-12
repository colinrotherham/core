module.exports = {
  presets: [
    ['@babel/env', {
      shippedProposals: true,
      useBuiltIns: 'usage',
      corejs: 3,
      targets: {
        node: '10.16',
        browsers: []
      }
    }]
  ]
};
