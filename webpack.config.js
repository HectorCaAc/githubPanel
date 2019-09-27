const path = require('path');

module.exports = {
  watch:true,
  entry:'./src/index.js',
  mode:'development',
  output:{
    filename:'[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
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
                      '@babel/env']
            }
          }
        ]
      },
      {
        test:/\.css$/,
        use:[
          "style-loader",
          {
            loader:"css-loader",
            options:{
              modules:true
            }
          }
        ]
      },
      {
        test:/\.(png|svg|jpg|gif)$/,
        use:{
          loader:"file-loader"
        }
      }
    ]
  }
};
