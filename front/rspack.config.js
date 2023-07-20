/**
 * @type {import('@rspack/cli').Configuration}
 */
const path = require('path')

const name = 'rolder-kit'
const version = '0.0.3'
const baseDir = '/Users/decard/Library/Application Support/Noodl/projects/'
const projectDir = 'f49f7913-f59d-465d-9f42-701b2c83a4f5'
var outputPath = path.resolve(__dirname, baseDir + projectDir + '/noodl_modules/' + name + '_v' + version)

module.exports = {
	context: __dirname,
	watch: true,
	entry: {
		main: "./main.jsx"
	},
	output: {
		path: outputPath,
		clean: true
	},
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM'
	},
	builtins: {
		react: {
			runtime: 'classic'
		},
		copy: {
			patterns: [
				{
					from: './assets/manifest.json',
				},
			],
		},
	},
	module: {
		rules: [
			{
				test: /\.svg$/,
				type: 'asset'
			}
		]
	}
}