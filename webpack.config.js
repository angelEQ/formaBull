const path = require('path');

module.exports = {
  target: 'electron-renderer',
  
  devServer: {
    publicPath: '/dist/',
    hot: true
    //no proxy needed, because we are using electron
    // proxy: {
    //   //localhost replaced with wildcard [::1] as well as changeOrigin to get rid of bug that sends localhost to 8080
    //   '*': 'http://[::1]:3000/'
    // },
    // changeOrigin: true,
    // secure: false,

  },

  mode: process.env.NODE_ENV,
  entry: './main.ts',
  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  
  module: {
    rules: [
    {
      test: /\.(ts|tsx)$/,
      use: ['ts-loader']
    },
    {
      test: /\.(js|jsx)$/,
      // Exclude node modules because majority are ES5 compatible and it will save time to not go through all the modules to check for compatibility.
      exclude: /node_modules/,
      use: ['react-loader', 'babel-loader'],
      // options: {
      //   presets: ['@babel/preset-env', '@babel/preset-react'],
      // },
    },
      {
        test: /.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
    ]
  },
  // If multiple files share the same name but have different extensions, 
  //webpack will resolve the one with the extension listed first in the array and skip the rest.
  resolve: { 
    extensions: ['.js', '.jsx', '.tsx'],
    fallback: {
          "path": require.resolve('path-browserify'),
        }
  }
};
