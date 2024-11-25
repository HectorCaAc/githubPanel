const path = require('path');

module.exports = {
  watch:true,
  entry:'./index.js',
  mode:'development',
  context: path.join(__dirname, 'src'),
  output:{
    filename:'[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
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
  }
};
