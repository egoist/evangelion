import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'

const prod = process.env.NODE_ENV === 'production'
const cjs = process.env.BUILD_FORMAT === 'cjs'

const config = {
	entry: './src/index.js',
	dest: 'dist/eva.js',
	plugins: [
		babel({
			exclude: 'node_modules/**',
			presets: ['es2015-rollup']
		})
	]
}

if (prod) {
	config.dest = 'dist/eva.min.js'
	config.plugins.push(uglify())
}

if (cjs) {
	config.dest = 'index.js'
	config.format = 'cjs'
} else {
	config.format = 'umd'
	config.moduleName = 'eva'
	config.plugins.push(
		resolve({ jsnext: true, main: true }),
		commonjs({
			include: 'node_modules/**'
		})
	)
}

export default config
