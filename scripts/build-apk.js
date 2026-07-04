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

  // 1. Build static Next.js assets
  console.log("\n[Step 1/4] Compiling Next.js Web App...");
  if (!runCommand("npm run build:static", rootDir)) {
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
  // We use assembleDebug because it is automatically signed with a debug key
  // and can be easily installed on mobile devices without setting up signing keys.
  console.log("\n[Step 3/4] Running Gradle assembleDebug (Compiling pre-signed installable APK)...");
  
  // Choose correct gradlew command based on platform
  const isWindows = process.platform === "win32";
  const gradleCmd = isWindows ? "gradlew.bat assembleDebug" : "./gradlew assembleDebug";
  
  if (!runCommand(gradleCmd, androidDir)) {
    console.error("Gradle build failed. Aborting.");
    process.exit(1);
  }

  // 4. Locate and copy the compiled APK
  console.log("\n[Step 4/4] Locating and exporting APK...");
  const apkSourcePath = path.join(androidDir, "app", "build", "outputs", "apk", "debug", "app-debug.apk");
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
