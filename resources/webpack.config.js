const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const scripts = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'scripts.json'), 'utf-8'));
const styles = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'styles.json'), 'utf-8'));

const entries = {};
for (const [key, value] of Object.entries(scripts)) {
  entries[key] = value.map(file => path.resolve(__dirname, file));
  if (styles[key]) {
    entries[key] = entries[key].concat(styles[key].map(file => path.resolve(__dirname, file)));
  }
}

if (styles.global) {
  entries.global = styles.global.map(file => path.resolve(__dirname, file));
}

module.exports = {
  entry: entries,
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, '../public'),
  },
  resolve: {
    extensions: ['.ts', '.js', '.scss'],
    modules: [path.resolve(__dirname, 'resources/node_modules'), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
};