const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  try {
    // Debug: Show the actual file structure
    const currentDir = __dirname;
    const parentDir = path.dirname(currentDir);
    
    const debugInfo = {
      currentDir,
      parentDir,
      currentDirFiles: fs.readdirSync(currentDir).slice(0, 10),
      parentDirFiles: fs.readdirSync(parentDir).slice(0, 10),
      lookingFor: [
        { path: './main.js', exists: fs.existsSync(path.join(currentDir, 'main.js')) },
        { path: '../main.js', exists: fs.existsSync(path.join(parentDir, 'main.js')) },
        { path: './dist/main.js', exists: fs.existsSync(path.join(currentDir, 'dist', 'main.js')) },
        { path: '../dist/main.js', exists: fs.existsSync(path.join(parentDir, 'dist', 'main.js')) }
      ]
    };
    
    res.status(200).json({ 
      message: 'Debug info for Vercel file structure',
      debug: debugInfo
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Debug error', 
      message: error.message,
      currentDir: __dirname
    });
  }
}; 