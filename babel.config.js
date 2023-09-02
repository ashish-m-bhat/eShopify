module.exports = {
	presets: [
		[
			'@babel/preset-react',
			{
				targets: {},
				useBuiltIns: 'usage'
			}
		],
		[
			'@babel/preset-env',
			{
				targets: {
					esmodules: true,
					browsers: '> 2%'
				}
			}
		]
	],
	env: {
		test: {
			plugins: ['dynamic-import-node']
		}
	}
};
