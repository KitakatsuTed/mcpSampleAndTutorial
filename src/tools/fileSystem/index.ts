import { ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import { createMcpCreatedDirectory } from "../../helper/fileSystem/index.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerFileSystemTools(server: McpServer): McpServer {

  // DesktopへmcpCreatedディレクトリ作成ツール
  server.tool(
    "create_mcp_created_directory",
    "Create a 'mcpCreated' directory on the Mac desktop",
    {
      type: "object",
      properties: {},
      required: [],
    },
    async () => {
      try {
        const result = await createMcpCreatedDirectory();
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        throw new McpError(
          ErrorCode.InternalError,
          `Failed to create mcpCreated directory: ${error}`
        );
      }
    }
  );
  
  return server;
}