const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'production',
    context: path.resolve(__dirname, 'src'),
    entry: {
        index: './index.js',
        cli: './cli.js',
    },
    target: 'node',
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'security', to: 'security' },
                { from: 'settings', to: 'settings' },
            ],
        }),
    ],
}
