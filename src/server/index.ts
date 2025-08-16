import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

// MCP サーバーインスタンス
export const server = new McpServer({
  name: "weather",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});
