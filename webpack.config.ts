import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Declare config types
type envMode = "production" | "development";
type buildFolder = "build" | "web";

interface configEnv {
    mode:       envMode
    serverPort: number
    build:      buildFolder
    proxy:      boolean
}


// Config options
export default (env: configEnv) => {

    const isDevelopMode = (env.mode === "development");
    const pathStatic: string = "static";

    return {
        
        // Project env mode
        mode: env.mode ?? "development",
    
        // Entry JS File
        entry: "./src/main.tsx",
        output: {
            filename: path.join(pathStatic, "bundle.[contenthash].js"),
            path: path.resolve(__dirname, env.build ?? "build"),
            clean: true,
        },

        // Configurating some plugins
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "public", "index.html"),
                cache: false,
                favicon: "./src/components/favicon.svg"
            }),
            new MiniCssExtractPlugin({
                filename: "static/styles.[contenthash].css",
            })
        ],

        // Loaders rules
        module: {
            rules: [

                {
                    test: /\.svg$/,
                    issuer: /\.[jt]sx?$/,
                    use: ['@svgr/webpack'],
                },
        
                // Handle SVGs as files (icons, images)
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/[name].[hash].[ext]',
                    },
                },

            // TypeScript loader
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },

            // CSS loader
                {
                    test: /\.css$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                url: false,
                                importLoaders: 1,
                            },
                        },
                    ],
                },


                {
                    test: /\.(woff(2)?)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'static/font.[name].[ext]',
                    },
                },
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

            historyApiFallback: true,
            compress: false,

            port: env.serverPort ?? 3000,

            proxy: env.proxy ? [
                {
                  context: ['/api'],
                  target: 'http://localhost:3000/',
                  ws: true,
                  sockPort: 3000
                },

                {
                    context: ['/login'],
                    target: 'http://localhost:3000/',
                },
            ] : [],
        },
    };
}