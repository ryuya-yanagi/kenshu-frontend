# kenshu-frontend

github pages -> https://ryuya-yanagi.github.io/kenshu-frontend/

## Directory structure

```
kenshu-frontend/
          ├ public/         <-- Webpackでロードしない静的ファイルを格納
          │   └ images/
          ├ src/
          │   ├ assets/
          │   │    ├ img/   <-- Webpackでロードする画像ファイルを格納
          │   │    └ sass/  <-- Sassを格納
          │   └ index.js    <-- Webpackのエントリーポイント
          ├ .gitignore
          ├ README.md
          ├ index.html
          ├ package.json
          ├ webpack.config.js
          └ yarn.lock
```

## How to deploy

デプロイ方法は、<a href="https://www.npmjs.com/package/gh-pages">gh-pages</a>を使用して、gh-pages というブランチにデプロイを行います。

```
yarn deploy
```

上記のコマンドを実行することで、package.json に登録しているコマンドが実行され、デプロイできます。

この方法により、開発用のブランチと本番環境用のブランチを切り分けることができます。

本番環境用のブランチは<a href="https://github.com/ryuya-yanagi/kenshu-frontend/tree/gh-pages">こちら</a>です

## Install

```
yarn
```

## Start to development

```
yarn start
```
