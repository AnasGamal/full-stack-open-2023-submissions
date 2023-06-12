module.exports = {
	'env': {
	  'commonjs': true,
	  'es2021': true,
	  'node': true,
	},
	'extends': 'eslint:recommended',
	'parserOptions': {
	  'ecmaVersion': 'latest'
	},
	'rules': {
	  'indent': [
		'error',
		2,
		{ 'SwitchCase': 1 }
	  ],
	  'eqeqeq': 'error',
	  'no-trailing-spaces': 'error',
	  'object-curly-spacing': [
		'error', 'always'
	  ],
	  'arrow-spacing': [
		'error', { 'before': true, 'after': true }
	  ],
	  'linebreak-style': [
		'error',
		'unix'
	  ],
	  'quotes': [
		'error',
		'single'
	  ],
	  'semi': [
		'error',
		'never'
	  ],
	  'no-console': 0,
	  'no-unused-vars': 'error'
	}
  };  