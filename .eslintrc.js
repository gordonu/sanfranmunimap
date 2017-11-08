module.exports = {
  "extends": "airbnb",
  "env": {
    "browser": true,
  },
  "rules": {
    "prefer-destructuring": ["error", {
      "array": false,
      "object": false
    }, {
        "enforceForRenamedProperties": false
      }],
    "arrow-body-style": ["error", "always"],
    "react/prop-types": [0, {ignore: [], customValidators: [] }]
  }
};