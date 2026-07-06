"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Download, 
  Smartphone, 
  Settings, 
  CheckCircle2, 
  HelpCircle, 
  Terminal, 
  Share, 
  Info,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import BackButton from "@/components/BackButton";
import { motion } from "framer-motion";

export default function DownloadPage() {
  const [activeTab, setActiveTab] = useState("android");
  const [detectedOS, setDetectedOS] = useState("unknown");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ua = navigator.userAgent.toLowerCase();
      if (/android/.test(ua)) {
        setDetectedOS("android");
        setActiveTab("android");
      } else if (/iphone|ipad|ipod/.test(ua)) {
        setDetectedOS("ios");
        setActiveTab("pwa");
      } else {
        setDetectedOS("desktop");
        setActiveTab("android");
      }
    }
  }, []);

  const copyCommand = () => {
    navigator.clipboard.writeText("npm run apk:export");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="bg-background/50 text-foreground min-h-screen pt-20 relative">
      <Navbar />
      <BackButton />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-16 max-w-5xl"
      >
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground font-semibold text-xs tracking-wider uppercase mb-4">
            Mobile Access
          </span>
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
            Install Farah Origin
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Take our crochet and henna collections with you. Access our services, view collections, and order custom creations instantly from your mobile home screen.
          </p>

          {detectedOS !== "unknown" && (
            <div className="mt-6 inline-flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full text-sm text-foreground/80 border border-border">
              <Smartphone size={16} className="text-primary animate-pulse" />
              <span>
                Detected System: <strong className="capitalize">{detectedOS === "ios" ? "iOS (iPhone/iPad)" : detectedOS}</strong>
              </span>
            </div>
          )}
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-12">
          <div className="bg-muted p-1.5 rounded-2xl flex w-full max-w-md shadow-inner border border-border">
            <button
              onClick={() => setActiveTab("android")}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === "android"
                  ? "bg-card text-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Smartphone size={16} />
              Android App
            </button>
            <button
              onClick={() => setActiveTab("pwa")}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === "pwa"
                  ? "bg-card text-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Share size={16} />
              Web PWA
            </button>
            <button
              onClick={() => setActiveTab("developer")}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === "developer"
                  ? "bg-card text-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Terminal size={16} />
              Developer
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid md:grid-cols-5 gap-12 items-start mb-20">
          
          {/* Main instructions card - spans 3 cols */}
          <div className="md:col-span-3 bg-card border border-border rounded-3xl p-8 shadow-xl relative overflow-hidden transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/25 rounded-full blur-3xl -z-10"></div>

            {/* ANDROID TAB */}
            {activeTab === "android" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-2xl text-primary mt-1">
                    <Download size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold font-playfair text-card-foreground">Android APK Installation</h2>
                    <p className="text-muted-foreground text-sm mt-1">Download and install our native Android app directly on your phone.</p>
                  </div>
                </div>

                {/* Info Card */}
                <div className="bg-secondary/40 border border-secondary rounded-2xl p-4 flex gap-3 text-sm text-secondary-foreground">
                  <ShieldCheck className="flex-shrink-0 text-primary mt-0.5" size={18} />
                  <div>
                    <span className="font-semibold block">Secure & Verified APK</span>
                    This build is compiled directly from the application source code. It runs offline, supports push notifications, and is secure.
                  </div>
                </div>

                {/* Steps */}
                <div className="space-y-4 pt-2">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <span>How to Install:</span>
                  </h3>
                  
                  <div className="relative border-l-2 border-primary/20 pl-6 ml-3 space-y-6">
                    <div className="relative">
                      <div className="absolute -left-9 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-md">
                        1
                      </div>
                      <h4 className="font-semibold text-foreground">Download the APK</h4>
                      <p className="text-sm text-muted-foreground mt-1">Click the button below to download the `farah-origin.apk` installer file to your device.</p>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-9 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-md">
                        2
                      </div>
                      <h4 className="font-semibold text-foreground">Enable Unknown Sources (If Asked)</h4>
                      <p className="text-sm text-muted-foreground mt-1">If Android warns you, click **Settings** on the prompt, then turn on **"Allow from this source"** for your web browser.</p>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-9 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-md">
                        3
                      </div>
                      <h4 className="font-semibold text-foreground">Complete Installation</h4>
                      <p className="text-sm text-muted-foreground mt-1">Open the downloaded `.apk` file and tap **Install**. Once finished, open the app from your home screen!</p>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-6">
                  <a
                    href="/farah-origin.apk"
                    download="farah-origin.apk"
                    className="w-full flex items-center justify-center gap-3 bg-primary text-primary-foreground py-4 rounded-2xl font-bold hover:bg-primary/95 transition shadow-lg shadow-primary/20 hover:scale-[1.01]"
                  >
                    <Download size={20} />
                    Download Android App (.apk)
                  </a>
                  <span className="block text-center text-xs text-muted-foreground mt-3">
                    Size: ~8 MB | Recommended for Android 10+
                  </span>
                </div>
              </div>
            )}

            {/* WEB PWA TAB */}
            {activeTab === "pwa" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-2xl text-primary mt-1">
                    <Share size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold font-playfair text-card-foreground">Progressive Web App (PWA)</h2>
                    <p className="text-muted-foreground text-sm mt-1">Install directly through your web browser without downloading files.</p>
                  </div>
                </div>

                <div className="bg-secondary/40 border border-secondary rounded-2xl p-4 flex gap-3 text-sm text-secondary-foreground">
                  <Info className="flex-shrink-0 text-primary mt-0.5" size={18} />
                  <div>
                    <span className="font-semibold block">Lightweight & Fast</span>
                    Installs in under a second, takes almost no storage space, and updates automatically every time you load the app.
                  </div>
                </div>

                {detectedOS === "ios" ? (
                  <div className="space-y-4 pt-2">
                    <h3 className="font-semibold text-foreground">Instructions for iOS (Safari):</h3>
                    
                    <div className="relative border-l-2 border-primary/20 pl-6 ml-3 space-y-6">
                      <div className="relative">
                        <div className="absolute -left-9 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-md">
                          1
                        </div>
                        <h4 className="font-semibold text-foreground">Open Share Menu</h4>
                        <p className="text-sm text-muted-foreground mt-1">Tap the **Share** button <span className="bg-muted px-2 py-0.5 rounded text-xs font-bold border border-border">↑</span> in Safari's bottom toolbar.</p>
                      </div>

                      <div className="relative">
                        <div className="absolute -left-9 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-md">
                          2
                        </div>
                        <h4 className="font-semibold text-foreground">Add to Home Screen</h4>
                        <p className="text-sm text-muted-foreground mt-1">Scroll down the share sheet and tap **Add to Home Screen**.</p>
                      </div>

                      <div className="relative">
                        <div className="absolute -left-9 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-md">
                          3
                        </div>
                        <h4 className="font-semibold text-foreground">Confirm</h4>
                        <p className="text-sm text-muted-foreground mt-1">Tap **Add** in the top right corner. The Farah Origin icon is now on your home screen!</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 pt-2">
                    <h3 className="font-semibold text-foreground">Instructions for Android/Desktop (Chrome):</h3>
                    
                    <div className="relative border-l-2 border-primary/20 pl-6 ml-3 space-y-6">
                      <div className="relative">
                        <div className="absolute -left-9 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-md">
                          1
                        </div>
                        <h4 className="font-semibold text-foreground">Open Browser Menu</h4>
                        <p className="text-sm text-muted-foreground mt-1">Tap the **Three Dots menu** in the top right corner of Chrome.</p>
                      </div>

                      <div className="relative">
                        <div className="absolute -left-9 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-md">
                          2
                        </div>
                        <h4 className="font-semibold text-foreground">Select Install</h4>
                        <p className="text-sm text-muted-foreground mt-1">Select **Install app** or **Add to Home screen** from the list.</p>
                      </div>

                      <div className="relative">
                        <div className="absolute -left-9 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-md">
                          3
                        </div>
                        <h4 className="font-semibold text-foreground">Confirm Installation</h4>
                        <p className="text-sm text-muted-foreground mt-1">Click **Install** on the prompt. The app will launch in full-screen standalone mode!</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* DEVELOPER TAB */}
            {activeTab === "developer" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-2xl text-primary mt-1">
                    <Terminal size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold font-playfair text-card-foreground">Developer Compilation</h2>
                    <p className="text-muted-foreground text-sm mt-1">Build instructions for developers maintaining this repository.</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  This project integrates **Next.js static export** with **Capacitor CLI** to package the application as an Android APK. To compile a new APK and distribute it:
                </p>

                <div className="space-y-3">
                  <span className="text-sm font-semibold text-foreground">Automatic Export Command:</span>
                  <div className="bg-muted p-4 rounded-xl border border-border flex items-center justify-between font-mono text-sm overflow-x-auto font-semibold">
                    <span>npm run apk:export</span>
                    <button
                      onClick={copyCommand}
                      className="ml-4 bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-muted-foreground pt-2">
                  <h4 className="font-semibold text-foreground">Under the Hood:</h4>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>Builds the static Next.js project into the <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs text-primary">out/</code> directory.</li>
                    <li>Runs <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs text-primary">npx cap sync android</code> to transfer code to the Android Project.</li>
                    <li>Invokes the local Gradle wrapper <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs text-primary">gradlew assembleDebug</code> inside the <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs text-primary">android</code> folder.</li>
                    <li>Copies the generated binary to <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs text-primary">public/farah-origin.apk</code>.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Right sidebar details - spans 2 cols */}
          <div className="md:col-span-2 space-y-6">
            
            {/* App Mockup UI */}
            <div className="bg-gradient-to-br from-secondary/50 to-primary/5 rounded-3xl p-6 border border-border text-center shadow-lg">
              <div className="w-20 h-20 bg-primary rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold shadow-md shadow-primary/20">
                FO
              </div>
              <h3 className="font-bold text-lg text-foreground">Farah Origin App</h3>
              <p className="text-xs text-muted-foreground mt-1">Aesthetic Crochet & Henna Atelier</p>
              
              <div className="mt-6 pt-6 border-t border-border space-y-3 text-left text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Version:</span>
                  <span className="font-semibold">1.0.0 (Capacitor v8)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Package name:</span>
                  <span className="font-mono text-xs">com.farahorigin.app</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Platforms:</span>
                  <span className="font-semibold">Android 8.0+ / iOS PWA</span>
                </div>
              </div>
            </div>

            {/* Help / FAQ */}
            <div className="bg-card rounded-3xl p-6 border border-border shadow-md">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <HelpCircle size={18} className="text-primary" />
                Frequently Asked
              </h3>
              
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold text-foreground">Is the APK safe to install?</h4>
                  <p className="text-muted-foreground text-xs mt-1">Yes, it is entirely secure. Because you download it outside the Google Play Store, Android marks it as "unknown", but it contains no malicious scripts or tracking.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">How do I update the app?</h4>
                  <p className="text-muted-foreground text-xs mt-1">To get the latest items and services, simply revisit this page on your browser, download the APK again, and install it over the existing app.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </motion.div>

      <Footer />
    </main>
  );
}
