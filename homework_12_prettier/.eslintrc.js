module.exports = {
    env: {
        es6: true,
        browser: true,
        node: true
    },
    extends: [
        'airbnb',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    plugins: [
        'prettier',
        '@typescript-eslint'
    ],
    rules: {
        'import/no-unresolved': "off",
        'import/extensions': "off"
    }
}