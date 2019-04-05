module.exports = {
	presets: [
		['@babel/env', {
			shippedProposals: true,
			useBuiltIns: 'usage',
			corejs: '3.0.0',
			targets: {
				node: '8.4',
				browsers: []
			}
		}]
	]
};
