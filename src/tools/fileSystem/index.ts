import { ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import { createMcpCreatedDirectory, createFileOnDesktop } from "../../helper/fileSystem/index.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

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
  
  // Desktopにサンプルファイルを作成するツール
  server.tool(
    "create_file_on_desktop",
    "Create a file with specified content on the Mac desktop",
    {
      filename: z.string().describe("Name of the file to create"),
      content: z.string().describe("Content to write to the file"),
    },
    async ({ filename, content }) => {
      try {
        const result = await createFileOnDesktop(filename, content);
        
        if (!result.success) {
          throw new McpError(
            ErrorCode.InternalError,
            result.message
          );
        }
        
        return {
          content: [
            {
              type: "text",
              text: result.message,
            },
          ],
        };
      } catch (error) {
        throw new McpError(
          ErrorCode.InternalError,
          `Failed to create file on desktop: ${error}`
        );
      }
    }
  );
  
  return server;
}