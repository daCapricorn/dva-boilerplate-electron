import autoprefixer from 'autoprefixer';
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import mainConfig from './webpack.config.main.babel.js';

function recursiveIssuer(m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer);
  } else if (m.name) {
    return m.name;
  } else {
    return false;
  }
}

export default [
  {
    target: 'electron-renderer',
    devtool: '',
    entry: {
      loading: [
        './src/renderer/loading/index.js',
      ],
      test: [
        './src/renderer/test/index.js',
      ],
    },
    output: {
      filename: '[name].bundle.js',
      publicPath: '../dist/',
      path: path.join(__dirname, 'app', 'dist'),
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
            MiniCssExtractPlugin.loader,
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
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css',
        chunkFilename: '[id].[hash].css',
      }),

      new HtmlWebpackPlugin({
        inject: true,
        chunks: ['loading'],
        title: 'jdfkjdfjdkf',
        template: './src/renderer/template.ejs',
        filename: 'index.html',
      }),

      new HtmlWebpackPlugin({
        inject: true,
        chunks: ['test'],
        title: 'test',
        template: './src/renderer/template.ejs',
        filename: 'test.html',
      }),

      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
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

  },

  mainConfig,
];
