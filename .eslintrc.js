module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": [
        "airbnb-base"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 11
    },
    "rules": {
        "no-console": 0,
        "semi": [2, "never"],
        "arrow-parens": 0,
        "consistent-return": 0,
        "global-require": 0,
        "import/no-dynamic-require": 0
    }
};
