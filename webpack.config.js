const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');  // For JS minification
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // For cleaning output 

module.exports = {
  watch:true,
  entry:'./index.js',
  mode:'development',
  context: path.join(__dirname, 'src'),
  output:{
    filename:'[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    open: true,
  },
  module:{
    rules:[
      {
        test:/\.(js|jsx)$/,
        exclude:/node_modules/,
        use:[
            {
            loader:"babel-loader",
            options:{
              presets:['@babel/react',
                      '@babel/env'],
              plugins: ["transform-class-properties",
                        "@babel/plugin-transform-runtime"]
            },

          }
        ]
      },
      {
        test:/\.(png|svg|jpg|gif)$/,
        use:{
          loader:"file-loader"
        }
      },
      {
        test:/\.s[ac]ss$/i,
        use:[
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(), // Clean the output folder before each build
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true,
      },
    }),
  ],
  optimization: {
    minimize: true, // Enable JavaScript minification
    minimizer: [
      new TerserPlugin(), // For JS minification
    ],
    splitChunks: {
      chunks: 'all', // Split vendor libraries into separate bundles
    },
  },
  devtool: 'source-map',  // Optional: Generate source maps for debugging in production
};
