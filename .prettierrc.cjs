module.exports = {
    trailingComma: 'all',
    singleQuote: true,
    printWidth: 150,
    tabWidth: 4,
    overrides: [
        {
            files: '*.json',
            options: {
                tabWidth: 2,
                trailingComma: 'none',
            },
        },
    ],
};
