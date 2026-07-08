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
  console.log("=== FARAH ORIGIN APK EXPORT PIPELINE ===");

  process.env.BUILD_APK = 'true';

  // 1. Build static Next.js assets
  console.log("\n[Step 1/4] Compiling Next.js Web App...");
  const apiDir = path.join(rootDir, "app", "api");
  const tempApiDir = path.join(rootDir, "app", "_api_temp_hidden");
  
  // Hide API directory so Next.js static export doesn't fail on dynamic routes
  if (fs.existsSync(apiDir)) {
    console.log("Temporarily hiding /api routes for static export...");
    fs.renameSync(apiDir, tempApiDir);
    const nextDir = path.join(rootDir, ".next");
    if (fs.existsSync(nextDir)) {
      fs.rmSync(nextDir, { recursive: true, force: true });
    }
  }

  const buildSuccess = runCommand("npm run build:static", rootDir);

  // Restore API directory
  if (fs.existsSync(tempApiDir)) {
    console.log("Restoring /api routes...");
    fs.renameSync(tempApiDir, apiDir);
  }

  if (!buildSuccess) {
    console.error("Next.js build failed. Aborting.");
    process.exit(1);
  }

  // Delete the recursively copied APK file from the output directory to prevent nesting bloat
  const copiedApkPath = path.join(rootDir, "out", "farah-origin.apk");
  if (fs.existsSync(copiedApkPath)) {
    console.log("Cleaning recursively copied APK from static export...");
    try {
      fs.unlinkSync(copiedApkPath);
    } catch (err) {
      console.warn(`Warning: Could not delete ${copiedApkPath}: ${err.message}`);
    }
  }

  // 2. Sync files with Capacitor
  console.log("\n[Step 2/4] Syncing web assets to Capacitor Android...");
  if (!runCommand("npx cap sync android", rootDir)) {
    console.error("Capacitor sync failed. Aborting.");
    process.exit(1);
  }

  // 3. Compile APK using Gradle
  // We use assembleRelease to build a signed production-ready APK
  console.log("\n[Step 3/4] Running Gradle assembleRelease (Compiling signed release APK)...");
  
  // Choose correct gradlew command based on platform
  const isWindows = process.platform === "win32";
  const gradleCmd = isWindows ? "gradlew.bat assembleRelease" : "./gradlew assembleRelease";
  
  if (!runCommand(gradleCmd, androidDir)) {
    console.error("Gradle build failed. Aborting.");
    process.exit(1);
  }

  // 4. Locate and copy the compiled APK
  console.log("\n[Step 4/4] Locating and exporting APK...");
  const apkSourcePath = path.join(androidDir, "app", "build", "outputs", "apk", "release", "app-release.apk");
  const apkDestPath = path.join(publicDir, "farah-origin.apk");

  if (fs.existsSync(apkSourcePath)) {
    try {
      fs.copyFileSync(apkSourcePath, apkDestPath);
      console.log(`\n🎉 SUCCESS! APK successfully exported to: ${apkDestPath}`);
      console.log(`You can now serve the app and download the APK from the /download page.`);
    } catch (copyErr) {
      console.error(`Error copying APK file: ${copyErr.message}`);
      process.exit(1);
    }
  } else {
    console.error(`\nCould not find compiled APK at: ${apkSourcePath}`);
    // Check release folder just in case
    const releaseSourcePath = path.join(androidDir, "app", "build", "outputs", "apk", "release", "app-release-unsigned.apk");
    if (fs.existsSync(releaseSourcePath)) {
      try {
        fs.copyFileSync(releaseSourcePath, apkDestPath);
        console.log(`\n🎉 SUCCESS! Release APK (unsigned) exported to: ${apkDestPath}`);
        process.exit(0);
      } catch (copyErr) {
        console.error(`Error copying release APK file: ${copyErr.message}`);
        process.exit(1);
      }
    }
    process.exit(1);
  }
}

main();
