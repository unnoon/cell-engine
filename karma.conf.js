const tsconfig     = require('./tsconfig.json');
const es6Transform = require("karma-typescript-es6-transform")();

tsconfig.compilerOptions.noEmit = false;

module.exports = function(config) {
    config.set({
        frameworks: ['mocha', 'chai', 'sinon', 'karma-typescript'],
        files: [
            'node_modules/babel-polyfill/dist/polyfill.js',
            'src/**/*.ts',
            'test/unit/**/*.spec.ts',
        ],
        preprocessors: {
            '**/*.ts': ['karma-typescript'],
        },
        reporters: ['progress', 'karma-typescript'],
        karmaTypescriptConfig: {
            bundlerOptions: {transforms: [es6Transform]},
            compilerOptions: tsconfig.compilerOptions,
            exclude: tsconfig.exclude,
            reports: {
                'html': '.coverage',
                'text-summary': '',
                'text-lcov': ''
            }
        },
        browsers: ['ChromeHeadless'],
    });
};