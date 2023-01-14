/**
 * pathing alt for ES6
 *     - https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-js-when-using-es6-modules/50052194#50052194
 */
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import wpCommonConfig from './webpack.common.js';
import { merge } from 'webpack-merge';

const __dirname = dirname(fileURLToPath(import.meta.url));

const wpDevConfig = merge(wpCommonConfig,{
    mode: "development",
    output:{
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    devServer: {
        static: {
          directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
    },
})

export default wpDevConfig;