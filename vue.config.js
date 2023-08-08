module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.worker.js$/,
          loader: "worker-loader",
          options: {
            /* ... */
          },
        },
      ],
    },
  },
};
