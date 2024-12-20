import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";

// Declare config types
type envMode = "production" | "development";
type buildFolder = "build" | "web";

interface configEnv {
    mode:       envMode
    serverPort: number
    build:      buildFolder
}


// Config opyions
module.exports = (env: configEnv) => {

    const isDevelopMode = (env.mode === "development");

    return {
        
        // Project env mode
        mode: env.mode ?? "development",
    
        // Entry JS File
        entry: "./src/main.tsx",
        output: {
            filename: "bundle.[contenthash].js",
            path: path.resolve(__dirname, env.build ?? "build"),
            clean: true
        },

        // Configurating some plugins
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "public", "index.html"),
                cache: false
            }),
            new MiniCssExtractPlugin({
                filename: "styles.[contenthash].css",
            })
        ],

        // Loaders rules
        module: {
            rules: [
            // TypeScript loader
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                // {
                //     test: /\.css$/i,
                //     use: [MiniCssExtractPlugin.loader, "css-loader"],
                // },
            // CSS loader
                {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, "css-loader"],
                },
            // Image content loader
                {
                    test: /\.(woff(2)?|png|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },

                {
                    test: /\.svg$/,
                    use: [
                      {
                        loader: 'file-loader',
                        options: {
                          name: '[name].[ext]',
                          outputPath: 'assets/',
                        },
                      },
                    ],
                }
            ],
          },

        // File name resolving
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },

        devtool: isDevelopMode ? "inline-source-map" : undefined,

        // Webpack development server config
        devServer: {
            static: {
              directory: path.join(__dirname, "build"),
            },
            compress: true,
            port: env.serverPort ?? 9000,
        },
    };
}