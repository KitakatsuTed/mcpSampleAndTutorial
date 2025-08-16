## MCP サーバーチュートリアル

### MCP サーバーを作るときにやること要約

1. MCP サーバーインスタンスを用意

- サーバーの設定

2. ツールを用意

- このプロジェクトなら、お天気 API に接続

3. 1 で作成したインスタンスにツールを登録する
4. サーバーを起動

AI に呼び出された時の挙動をツールに実装することがメインのイメージ

### サーバーの準備

```sh
npm install
npm run build
```

### MCP の設定(Claude など)

```json
{
  "mcpServers": {
    "weather": {
      "command": "node",
      "args": ["/PATH/TO/mcp_tutorial/build/index.js"]
    }
  }
}
```

### MPC サーバーのデバッグ

```sh
npm run debug
```

### 参考

- 本家
  - http://modelcontextprotocol.io/quickstart/server#node
- その他
  - https://qiita.com/chomado/items/968eca2a96873ccad938
