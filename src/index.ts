import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { server } from "./server/index.js";
import { registerWeatherTools } from "./tools/weather/index.js";
import { registerFileSystemTools } from "./tools/fileSystem/index.js";

// AIはプロンプトを受けてここを呼び出す
async function main() {
  const transport = new StdioServerTransport();

  // ツールの登録をplugableな感じにすると環境変数などで利用するツールを切り替えることもできそう
  registerFileSystemTools(registerWeatherTools(server));

  await server.connect(transport);
  console.error("Weather MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});