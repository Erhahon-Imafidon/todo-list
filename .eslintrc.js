module.exports = {
    extends: ['expo', 'prettier'],
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': 'error',
        quotes: ['error', 'single'],
        'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
};
