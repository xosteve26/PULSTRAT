const webpack = require("webpack");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
    /* ... */

    resolve: {
        fallback: {
            process: require.resolve("process/browser"),
            zlib: false,
            stream: require.resolve("stream-browserify"),
            util: require.resolve("util"),
            buffer: require.resolve("buffer"),
            asset: require.resolve("assert"),
        }
    },
    plugins: [
        new NodePolyfillPlugin(),
        new webpack.ProvidePlugin({
            Buffer: ["buffer", "Buffer"],
            process: "process/browser",
        }),
    ]

    /* ... */
}