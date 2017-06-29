/**
 * CSS config
 */

// Return module
export default config => {

	// Return bundles
	return [

		// Critical style bundle (inline CSS)
		`${config.paths.srcAssets}/scss/critical.scss`,

		// Main style bundle (Modern browsers)
		`${config.paths.srcAssets}/scss/main.scss`,

		// Legacy style bundle (IE8 and lower)
		`${config.paths.srcAssets}/scss/legacy.scss`
	];
};
