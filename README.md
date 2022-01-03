# 環境構築

## docker

ルートディレクトリに docker-compose.ymlがあるので、ルードディレクトリから

```
docker-compose build

docker-compose up -d
```


## サーバーサイド Laravel 7

公式のインストールを参照
https://readouble.com/laravel/7.x/ja/installation.html

### envファイルについて

.env.exampleから .envにコピーする


## フロント環境

```
yarn install 

yarn watch (開発)

yarn production (本番)
```
