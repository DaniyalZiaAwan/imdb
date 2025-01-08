module.exports = {
    sourceType: "module",
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            node: "current", // Target the current version of Node.js.
          },
        },
      ],
    ],
    plugins: [
      // Add any necessary Babel plugins here
    ],
  };
  