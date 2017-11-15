module.exports = {
	presets: [
		['@babel/env', {
			shippedProposals: true,
			useBuiltIns: 'usage',
			targets: {
				node: '8.4',
				browsers: []
			}
		}]
	]
};
