module.exports = {
	presets: [
		['env', {
			useBuiltIns: 'usage',
			loose: true
		}]
	],
	plugins: [
		['transform-es2015-modules-commonjs', { loose: true }],
		'transform-es3-member-expression-literals',
		'transform-es3-property-literals'
	]
};
