import HtmlWebpackPlugin from "html-webpack-plugin";


const wpCommonConfig = {
    entry: {
        main: "./src/index.js",
        // vendor: "./src/vendor.js"
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename:"index.html",
            chunks: [
                "index"
            ],
            inject: 'body',
        }),
        // new HtmlWebpackPlugin({
        //     template: './src/hello.html',
        //     filename:"vendor.html",
        //     chunks: [
        //         "vendor"
        //     ],
        //     inject: 'body',
        // }),
    ],
    module:{
        rules: [
            {
                test:/\.html$/,
                use:["html-loader"]
            },
            /**
             * This can be ommitted at the time of writing ( html-loader works with images )
             * - Disabled for now, duplicates the emission of static files
             */
            // {
            //     test: /\.(svg|png|jpg|gif)$/,
            //     use:{
            //         loader: "file-loader",
            //         options: {
            //             name: "[name].[hash].[ext]",
            //             outputPath: "static"
            //         }
                    
            //     }
            // }
        ],
    }
     
}

export default wpCommonConfig;