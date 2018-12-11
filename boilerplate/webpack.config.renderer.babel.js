import autoprefixer from 'autoprefixer';
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const serverIp = '127.0.0.1';
const serverPort = '8000';

module.exports = {
  target: 'electron-renderer',
  entry: {
    loading: [
      require.resolve('react-dev-utils/webpackHotDevClient'),
      './src/renderer/loading/index.js',
    ],
    test: [
      require.resolve('react-dev-utils/webpackHotDevClient'),
      './src/renderer/test/index.js',
    ],
  },
  output: {
    pathinfo: true,
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'app', 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'app', 'dist'),
    host: serverIp,
    port: serverPort,
    hot: true,
  },
  externals(context, request, callback) {
    let isExternal = false;
    const load = [
      'electron',
    ];
    if (load.includes(request)) {
      isExternal = `require("${request}")`;
    }
    callback(null, isExternal);
  },
  module: {
    rules: [
      {
        exclude: [
          /\.(html|ejs)$/,
          /\.json$/,
          /\.(js|jsx|ts|tsx)$/,
          /\.(css|less|scss|sass)$/,
        ],
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
      {
        test: /\.js$/,
        include: __dirname,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              // "babelrc": false
            },
          },
        ],
      },
      {
        test: /\.jsx$/,
        include: __dirname,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              // "babelrc": false
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['loading'],
      title: 'jdfkjdfjdkf',
      template: './src/renderer/template.ejs',
      filename: 'index.html',
    }),

    new HtmlWebpackPlugin({
      chunks: ['test'],
      title: 'test',
      template: './src/renderer/template.ejs',
      filename: 'test.html',
    }),

    new webpack.NamedModulesPlugin(),

    new webpack.HotModuleReplacementPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      },
    }),
  ],

  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },

  performance: {
    hints: false,
  },
};
