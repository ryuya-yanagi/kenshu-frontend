// 設定参考URL https://www.webdesignleaves.com/pr/css/sass_webpack.html
// path モジュールの読み込み
const path = require('path');
// MiniCssExtractPlugin の読み込み
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// CleanWebpackPlugin の読み込み
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// HTMLWebpackPlugin の読み込み
const HtmlWebpackPlugin = require('html-webpack-plugin');
// CopyFilePlugin の読み込み
const CopyFilePlugin = require('copy-webpack-plugin');
// production モード以外の場合、変数 enabledSourceMap は true
const enabledSourceMap = process.env.NODE_ENV !== 'production';

module.exports = {

  //エントリポイント（デフォルトと同じなので省略可）
  entry: './src/index.js',
  //出力先（デフォルトと同じなので省略可）
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
  },
  //webpack-dev-server の設定
  devServer: {
    //ルートディレクトリの指定
    contentBase: path.join(__dirname, ''),
    //サーバー起動時にブラウザを自動的に起動
    open: true,
    // ルートディレクトリのファイルを監視
    watchContentBase: true,
    //バンドルされたファイルを出力する（実際に書き出す）
    writeToDisk: true
  },
  module: {
    rules: [
      {
        // 対象となるファイルの拡張子(scss)
        test: /\.scss$/,
        // Sassファイルの読み込みとコンパイル
        use: [
          // CSSファイルを抽出するように MiniCssExtractPlugin のローダーを指定
          {
            loader: MiniCssExtractPlugin.loader,
          },
          // CSSをバンドルするためのローダー
          {
            loader: "css-loader",
            options: {
              url: false,
              // ソースマップを有効に
              sourceMap: enabledSourceMap,
              // postcss-loader と sass-loader の場合は2を指定
              importLoaders: 2,
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
            },
          },
          // PostCSS（autoprefixer）の設定
          {
            loader: "postcss-loader",
            options: {
              // PostCSS でもソースマップを有効に
              sourceMap: enabledSourceMap,
              postcssOptions: {
                plugins: [
                  // ベンダープレフィックスを自動付与
                  "autoprefixer",
                  // CSS Declaration Sorter（アルファベット順でソート）
                  ['css-declaration-sorter', { order: 'alphabetical' }],
                  // PostCSS Sort Media Queries（mobile-first でソート）
                  ['postcss-sort-media-queries', { sort: 'mobile-firstl' }]
                ]
              },
            },
          },
          // Sass を CSS へ変換するローダー
          {
            loader: "sass-loader",
            options: {
              // dart-sass を優先
              implementation: require('sass'),
              sassOptions: {
                // fibers を使わない場合は以下で false を指定
                fiber: require('fibers'),
              },
              // ソースマップを有効に
              sourceMap: enabledSourceMap,
            },
          },
          'import-glob-loader'
        ],
      },
      // file-loader の設定を追加
      {
        // 対象となるファイルの拡張子
        test: /\.(gif|png|jpe?g|svg|eot|wof|woff|ttf)$/i,
        use: [
          {
            //画像を出力フォルダーにコピーするローダー
            loader: 'file-loader',
            options: {
              // 画像ファイルの名前とパスの設定
              name: '[name].[ext]',
              outputPath: 'assets/img/',
            }
          }
        ],
      }
    ],
  },
  //プラグインの設定
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false
    }),
    new MiniCssExtractPlugin({
      // 抽出する CSS のファイル名
      filename: 'assets/css/style.css'
    }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new CopyFilePlugin({
      patterns: [
        {
          context: 'public',
          from: 'images/*',
          to: path.resolve(__dirname, 'dist')
        }
      ]
    }),
  ],
  //source-map タイプのソースマップを出力
  devtool: "source-map",
  // node_modules を監視（watch）対象から除外
  watchOptions: {
    ignored: /node_modules/  //正規表現で指定
  },
};