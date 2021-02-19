module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
        'no-unused-vars': 1,
        'react/react-in-jsx-scope': 0,
        'react/require-default-props': 1,
        'react/jsx-key': 1,
        'react/jsx-sort-default-props': 1,
        'react/prop-types': 0,
    },
};
