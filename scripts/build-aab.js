const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const androidDir = path.join(rootDir, "android");
const publicDir = path.join(rootDir, "public");

function runCommand(command, cwd) {
  console.log(`\nExecuting: ${command}`);
  try {
    execSync(command, { cwd, stdio: "inherit" });
    return true;
  } catch (error) {
    console.error(`\nError executing command: ${command}`);
    console.error(error.message);
    return false;
  }
}

function main() {
  console.log("=== FARAH ORIGIN GOOGLE PLAY BUNDLE (.AAB) PIPELINE ===");

  // 1. Build static Next.js assets
  console.log("\n[Step 1/4] Compiling Next.js Web App...");
  if (!runCommand("npm run build:static", rootDir)) {
    console.error("Next.js build failed. Aborting.");
    process.exit(1);
  }

  const copiedApkPath = path.join(rootDir, "out", "farah-origin.apk");
  if (fs.existsSync(copiedApkPath)) {
    try { fs.unlinkSync(copiedApkPath); } catch (err) {}
  }
  const copiedAabPath = path.join(rootDir, "out", "farah-origin-release.aab");
  if (fs.existsSync(copiedAabPath)) {
    try { fs.unlinkSync(copiedAabPath); } catch (err) {}
  }

  // 2. Sync files with Capacitor
  console.log("\n[Step 2/4] Syncing web assets to Capacitor Android...");
  if (!runCommand("npx cap sync android", rootDir)) {
    console.error("Capacitor sync failed. Aborting.");
    process.exit(1);
  }

  // 3. Compile AAB using Gradle bundleRelease
  console.log("\n[Step 3/4] Running Gradle bundleRelease (Compiling production bundle)...");
  const isWindows = process.platform === "win32";
  const gradleCmd = isWindows ? "gradlew.bat bundleRelease" : "./gradlew bundleRelease";
  
  if (!runCommand(gradleCmd, androidDir)) {
    console.error("Gradle build failed. Aborting.");
    process.exit(1);
  }

  // 4. Locate and copy the compiled AAB
  console.log("\n[Step 4/4] Locating and exporting AAB...");
  const aabSourcePath = path.join(androidDir, "app", "build", "outputs", "bundle", "release", "app-release.aab");
  const aabDestPath = path.join(publicDir, "farah-origin-release.aab");

  if (fs.existsSync(aabSourcePath)) {
    try {
      fs.copyFileSync(aabSourcePath, aabDestPath);
      console.log(`\n🎉 SUCCESS! Release Bundle successfully exported to: ${aabDestPath}`);
      console.log(`You can now upload this file to the Google Play Console.`);
    } catch (copyErr) {
      console.error(`Error copying AAB file: ${copyErr.message}`);
      process.exit(1);
    }
  } else {
    console.error(`\nCould not find compiled AAB at: ${aabSourcePath}`);
    process.exit(1);
  }
}

main();
