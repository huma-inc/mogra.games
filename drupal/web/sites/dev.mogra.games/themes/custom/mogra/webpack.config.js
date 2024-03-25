const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

// configuration BabelJS.
const babelEntries = {};
glob.sync('./assets/babel/**/*.es6.js').map(function (file) {
  const regEx = new RegExp(`./assets/babel/`, `g`);
  const key = file.replace(regEx, '').replace(/\.es6\.js$/, '');
  babelEntries[key] = path.resolve(__dirname, file);
});

const configBabel = {
  entry: babelEntries,
  output: {
    path: path.resolve(__dirname, 'js/'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'initial',
    }
  }
};

// configuration postcss
const pcssEntries = {};
glob.sync('./assets/pcss/**/*.pcss').map(function (file) {
  const regEx = new RegExp(`./assets/pcss/`, `g`);
  const key = file.replace(regEx, '').replace(/\.pcss$/, '');
  pcssEntries[key] = path.resolve(__dirname, file);
});

const configPostCSS = {
  entry: pcssEntries,
  output: {
    path: path.resolve(__dirname, 'css/'),
    filename: '[name].js',
    publicPath: '',
  },
  plugins: [
    new FixStyleOnlyEntriesPlugin({ extensions:['pcss'] }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.pcss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(webp|png|jpg|gif|svg)$/i,
        exclude: /assets\/fonts/,
        oneOf: [
          {
            resourceQuery: /tier1|tier2|tier3/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext][query]',
                  outputPath: '../images/',
                  publicPath: (url) => {
                    if (/\?tier1/.test(url)) {
                      return `../images/${url}`;
                    } else if (/\?tier2/.test(url)) {
                      return `../../images/${url}`;
                    } else if (/\?tier3/.test(url)) {
                      return `../../../images/${url}`;
                    }
                  }
                }
              }
            ]
          },
          {
            type: 'asset/inline'
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/i,
        include: /assets\/fonts/,
        type: 'asset/resource',
        generator: {
          filename: '../fonts/[name][ext]'
        }
      }
    ]
  }
};

module.exports = [configBabel, configPostCSS];
