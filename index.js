#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// 1. Get project name from command line
const projectName = process.argv[2] || 'my-tririga-app';
const currentDir = process.cwd();
const projectDir = path.join(currentDir, projectName);

// 2. Create Directory
if (fs.existsSync(projectDir)) {
  console.error(`Directory ${projectName} already exists.`);
  process.exit(1);
}
fs.mkdirSync(projectDir);

// 3. Copy Template Files
const templateDir = path.join(__dirname, 'template');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

copyRecursiveSync(templateDir, projectDir);

// Rename _gitignore to .gitignore
const gitignorePath = path.join(projectDir, '_gitignore');
if (fs.existsSync(gitignorePath)) {
  fs.renameSync(gitignorePath, path.join(projectDir, '.gitignore'));
}

// Helper function for user prompts
function askQuestion(query, hidden = false) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  if (hidden) {
    let stdinListener = (char) => {
      char = char + '';
      switch (char) {
        case '\n':
        case '\r':
        case '\u0004':
          process.stdin.removeListener('data', stdinListener);
          break;
        default:
          process.stdout.write('\x1B[2K\x1B[200D' + query + Array(rl.line.length + 1).join('*'));
          break;
      }
    };
    process.stdin.on('data', stdinListener);
  }

  return new Promise((resolve) => rl.question(query, (ans) => {
    rl.close();
    if (hidden) console.log(); // Add newline after hidden input
    resolve(ans);
  }));
}

async function configureApp() {
  console.log('\n--- Configuration Setup ---\n');

  const triUrl = await askQuestion('TRIRIGA Environment URL (e.g., https://your-tririga-server.com): ');
  const triUser = await askQuestion('TRIRIGA Username: ');
  const triPassword = await askQuestion('TRIRIGA Password: ', true);
  const appExposedName = await askQuestion('Application Exposed Name (e.g., myTririgaApp): ');
  const modelAndView = await askQuestion('Model and View Name (e.g., myTririgaApp): ');
  const webViewMetadataName = await askQuestion(`Web View Metadata Exposed Name (default: ${projectName}): `);

  const finalWebViewName = webViewMetadataName || projectName;

  // 4. Update package.json name with Web View Metadata Exposed Name
  const pkgJsonPath = path.join(projectDir, 'package.json');
  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
  pkgJson.name = finalWebViewName;
  fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2));

  // 5. Update .env file
  const envExamplePath = path.join(projectDir, '.env.example');
  const envPath = path.join(projectDir, '.env');
  if (fs.existsSync(envExamplePath)) {
    let envContent = fs.readFileSync(envExamplePath, 'utf8');
    envContent = envContent.replace(/VITE_TRIRIGA_PROXY_TARGET=.*/g, `VITE_TRIRIGA_PROXY_TARGET=${triUrl}`);
    envContent = envContent.replace(/VITE_MODEL_AND_VIEW=.*/g, `VITE_MODEL_AND_VIEW=${modelAndView}`);
    envContent = envContent.replace(/TRI_URL=.*/g, `TRI_URL=${triUrl}`);
    envContent = envContent.replace(/TRI_USER=.*/g, `TRI_USER=${triUser}`);
    envContent = envContent.replace(/TRI_PASSWORD=.*/g, `TRI_PASSWORD=${triPassword}`);
    fs.writeFileSync(envPath, envContent);
    // Delete .env.example
    fs.unlinkSync(envExamplePath);
  }

  // 6. Update tririgaService.ts
  const tririgaServicePath = path.join(projectDir, 'src', 'services', 'tririgaService.ts');
  if (fs.existsSync(tririgaServicePath)) {
    let tsContent = fs.readFileSync(tririgaServicePath, 'utf8');
    // Update production config values
    tsContent = tsContent.replace(/modelAndView:\s*"[^"]*"/, `modelAndView: "${modelAndView}"`);
    tsContent = tsContent.replace(/appExposedName:\s*"[^"]*"/, `appExposedName: "${appExposedName}"`);
    // Update dev config fallback values
    tsContent = tsContent.replace(/\|\| 'appName'/g, `|| '${appExposedName}'`);
    tsContent = tsContent.replace(/\/app\/appName\//g, `/app/${appExposedName}/`);
    fs.writeFileSync(tririgaServicePath, tsContent);
  }

  // 7. Update vite.config.ts base path and proxy target
  const viteConfigPath = path.join(projectDir, 'vite.config.ts');
  if (fs.existsSync(viteConfigPath)) {
    let viteContent = fs.readFileSync(viteConfigPath, 'utf8');
    // Update base path
    viteContent = viteContent.replace(/base:\s*['"]\/app\/[^/]+\/['"],/, `base: '/app/${appExposedName}/',`);
    // Update default proxy target
    viteContent = viteContent.replace(
      /const tririgaTarget = process\.env\.VITE_TRIRIGA_PROXY_TARGET \|\| '[^']*'/,
      `const tririgaTarget = process.env.VITE_TRIRIGA_PROXY_TARGET || '${triUrl}'`
    );
    fs.writeFileSync(viteConfigPath, viteContent);
  }

  console.log(`\nSuccess! Created and configured ${projectName}.`);
  console.log(`\nTo get started:\n  cd ${projectName}\n  npm install -g pnpm\n  pnpm install\n  pnpm run dev          # Local dev server with TRIRIGA API proxy\n  pnpm run build:deploy  # Build and deploy to TRIRIGA\n`);
}

configureApp();