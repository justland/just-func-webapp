require('@rushstack/eslint-patch/modern-module-resolution')
const path = require('path')

module.exports = {
	env: {
		es6: true
	},
	extends: ['react-app', 'plugin:harmony/latest', 'plugin:yml/standard'],
	overrides: [
		{
			extends: ['plugin:harmony/ts-prettier'],
			files: ['*.ts', '*.tsx'],
			parserOptions: {
				project: path.resolve(__dirname, 'tsconfig.json'),
				EXPERIMENTAL_useSourceOfProjectReferenceRedirect: true
			},
			rules: {
				'@typescript-eslint/no-unsafe-assignment': 'off',
				'@typescript-eslint/require-await': 'off',
				'react-hooks/exhaustive-deps': 'off'
			}
		},
		{
			extends: ['plugin:storybook/recommended'],
			files: ['**/*.stories.*'],
			rules: {
				'@typescript-eslint/await-thenable': 'off',
				'import/no-anonymous-default-export': 'off',
				'no-console': 'off'
			}
		},
		{
			files: ['**/*.spec.*'],
			rules: {
				'@typescript-eslint/no-floating-promises': 'off',
				'@typescript-eslint/no-unsafe-assignment': 'off',
				'@typescript-eslint/no-unsafe-call': 'off',
				'@typescript-eslint/no-unsafe-return': 'off'
			}
		}
	],
	root: true
}
