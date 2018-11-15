module.exports = {
    "extends": ["airbnb", "prettier", "prettier/react"],
    "plugins": ["babel", "prettier"],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 7,
        "jsx": true,
    },
    "env": {
        "browser": true,
        "es6": true,
    },
    "rules": {
        "prettier/prettier": [
            "error", {
                "singleQuote": true,
                "trailingComma": "es5",
                "tabWidth": 4,
                "printWidth": 100,
            },
        ],
    }
};