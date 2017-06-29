/**
 * JavaScript config
 */

// Return module
export default config => {

	// Return bundles
	return [

		// Critical JS bundle (assists inline CSS)
		`${config.paths.srcAssets}/js/critical.js`,

		// Main JS bundle (Modern browsers)
		`${config.paths.srcAssets}/js/main.js`,

		// Legacy JS bundle (IE8 and lower only)
		`${config.paths.srcAssets}/js/legacy.js`
	];
};
