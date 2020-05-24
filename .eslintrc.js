module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": [
        "airbnb-base",
        "prettier",
        "plugin:prettier/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 11
    },
    "plugins": ["prettier"],
    "rules": {
        "no-console": 0,
        "semi": [2, "never"],
        "arrow-parens": 0,
        "consistent-return": 0,
        "global-require": 0,
        "import/no-dynamic-require": 0,
        "prettier/prettier": "error"
    }
};
