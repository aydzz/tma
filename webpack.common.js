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
            inject: 'body',
            chunks: [
                "main"
            ],
            minify: false
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
                loader: "html-loader",
                // use:["html-loader"],
                options: {
                    // Disables attributes processing
                    sources: true
                }
            },
            /**
             * This can be ommitted at the time of writing ( html-loader works with images )
             * - Disabled for now, duplicates the emission of static files
             * - deprecated in webpack 5
             */
            // {
            //     test:/\.svg$/,
            //     use:{
            //         loader: "file-loader",
            //         options: {
            //             name: "[name].[ext]",
            //             outputPath: "static"
            //         }
                    
            //     }
            // },
            
        ],
    }
     
}

export default wpCommonConfig;