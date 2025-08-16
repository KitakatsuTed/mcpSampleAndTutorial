import * as fs from "fs/promises";
import * as path from "path";
import * as os from "os";

// mcpCreatedディレクトリを作成
// デスクトップパスを取得
const getDesktopPath = (): string => {
  return path.join(os.homedir(), "Desktop");
};

// フォルダが存在するかチェック
const folderExists = async (folderPath: string): Promise<boolean> => {
  try {
    const stats = await fs.stat(folderPath);
    return stats.isDirectory();
  } catch {
    return false;
  }
};

// mcpCreatedディレクトリを作成
export const createMcpCreatedDirectory = async (): Promise<{ success: boolean; message: string }> => {
  const desktopPath = getDesktopPath();
  const mcpCreatedPath = path.join(desktopPath, "mcpCreated");
  
  try {
    // 既に存在するかチェック
    if (await folderExists(mcpCreatedPath)) {
      return {
        success: false,
        message: `Directory "mcpCreated" already exists on desktop`
      };
    }
    
    // ディレクトリを作成
    await fs.mkdir(mcpCreatedPath, { recursive: true });
    
    return {
      success: true,
      message: `Successfully created "mcpCreated" directory on desktop`
    };
    
  } catch (error) {
    return {
      success: false,
      message: `Failed to create mcpCreated directory: ${error}`
    };
  }
};

// Desktopにファイルを作成
export const createFileOnDesktop = async (filename: string, content: string): Promise<{ success: boolean; message: string }> => {
  const desktopPath = getDesktopPath();
  const filePath = path.join(desktopPath, filename);
  
  try {
    // Desktopディレクトリが存在しない場合は作成
    await fs.mkdir(desktopPath, { recursive: true });
    
    // ファイルを作成
    await fs.writeFile(filePath, content, 'utf8');
    
    return {
      success: true,
      message: `Successfully created file "${filename}" on desktop`
    };
    
  } catch (error) {
    return {
      success: false,
      message: `Failed to create file "${filename}": ${error}`
    };
  }
};
