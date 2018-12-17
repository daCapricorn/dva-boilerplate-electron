import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import WatchMissingNodeModulesPlugin from 'react-dev-utils/WatchMissingNodeModulesPlugin';

const serverIp = '127.0.0.1';
const serverPort = '4010';

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
      {
        test: /\.(sass|scss)$/,
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
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
            },
          },
        ],
      },
      {
        test: /\.(sass|scss)$/,
        include: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
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

    new CaseSensitivePathsPlugin(),

    new WatchMissingNodeModulesPlugin(path.resolve('node_modules')),

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
