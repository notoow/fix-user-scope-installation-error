"use client";

import { useState } from "react";

export default function Home() {
  const [fileName, setFileName] = useState("");
  const [copied, setCopied] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showTroubleshoot, setShowTroubleshoot] = useState(false);

  const command = fileName.trim()
    ? `runas /trustlevel:0x20000 "${fileName.trim()}"`
    : 'runas /trustlevel:0x20000 "YourFile.exe"';

  const copyToClipboard = async () => {
    if (!fileName.trim()) return;
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = command;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadBatchFile = () => {
    const targetFile = fileName.trim();

    const batchContent = targetFile
      ? `@echo off
title RunAsUser - Fix for ${targetFile}
echo ============================================
echo   RunAsUser - De-elevate Admin Privileges
echo ============================================
echo.
echo [INFO] Running: ${targetFile}
echo.
runas /trustlevel:0x20000 "${targetFile}"
echo.
echo [DONE] If you see the installer, it worked!
pause
`
      : `@echo off
title RunAsUser - Force User Scope
echo ============================================
echo   RunAsUser - De-elevate Admin Privileges
echo ============================================
echo.
echo [INFO] Drag and drop your installer onto this .bat file,
echo        or enter the filename below.
echo.

if "%~1"=="" (
    set /p target="Enter installer filename (with extension): "
) else (
    set "target=%~1"
)

echo.
echo [EXECUTING] runas /trustlevel:0x20000 "%target%"
echo.

runas /trustlevel:0x20000 "%target%"

echo.
echo [DONE] If you see the installer, it worked!
pause
`;

    const blob = new Blob([batchContent], { type: "application/bat" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = targetFile ? `RunAsUser_${targetFile.replace(/\.[^/.]+$/, "")}.bat` : "RunAsUser_Fix.bat";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9]">
      {/* Header */}
      <header className="border-b border-[#30363d] py-4">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[#2ea043] text-2xl font-bold">&gt;_</span>
            <span className="text-xl font-bold">RunAsUser</span>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8b949e] hover:text-[#c9d1d9] transition-colors"
          >
            GitHub
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-[#f85149]">Error:</span>{" "}
            <span className="text-[#c9d1d9]">&quot;Updates are disabled...&quot;</span>
          </h1>
          <p className="text-xl text-[#2ea043] glow-green mb-6">
            Fix it in 3 seconds.
          </p>

          {/* Error Message Preview */}
          <div className="terminal max-w-2xl mx-auto mb-8">
            <div className="terminal-header">
              <div className="terminal-dot bg-[#f85149]"></div>
              <div className="terminal-dot bg-[#d29922]"></div>
              <div className="terminal-dot bg-[#2ea043]"></div>
              <span className="text-[#8b949e] text-sm ml-2">Error Message</span>
            </div>
            <div className="terminal-body text-left text-sm">
              <p className="text-[#f85149] mb-2">
                ! Updates are disabled because you are running as Administrator.
              </p>
              <p className="text-[#8b949e]">-- or --</p>
              <p className="text-[#f85149] mt-2">
                ! This User Installer is not meant to be run as an Administrator.
              </p>
            </div>
          </div>

          <p className="text-[#8b949e] max-w-2xl mx-auto">
            Getting this error with <span className="text-[#c9d1d9]">VS Code</span>,{" "}
            <span className="text-[#c9d1d9]">Cursor</span>,{" "}
            <span className="text-[#c9d1d9]">Antigravity</span>, or similar apps?
            Generate a fix command instantly.
          </p>
        </section>

        {/* Quick Fix - Main Solution */}
        <section className="mb-12">
          <div className="terminal max-w-2xl mx-auto">
            <div className="terminal-header">
              <div className="terminal-dot bg-[#f85149]"></div>
              <div className="terminal-dot bg-[#d29922]"></div>
              <div className="terminal-dot bg-[#2ea043]"></div>
              <span className="text-[#8b949e] text-sm ml-2">Quick Fix (Recommended)</span>
            </div>
            <div className="terminal-body">
              <div className="text-center py-4">
                <p className="text-[#c9d1d9] mb-4">
                  <span className="text-[#2ea043] font-bold">Step 1:</span> Download the universal fix tool
                </p>
                <button
                  onClick={downloadBatchFile}
                  className="bg-[#238636] hover:bg-[#2ea043] text-white py-4 px-8 rounded-lg font-semibold transition-colors inline-flex items-center gap-3 text-lg"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download RunAsUser_Fix.bat
                </button>
                <p className="text-[#c9d1d9] mt-6 mb-2">
                  <span className="text-[#2ea043] font-bold">Step 2:</span> Drag &amp; drop your installer onto the .bat file
                </p>
                <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-4 mt-4 inline-block">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="bg-[#30363d] rounded px-3 py-2">
                      <span className="text-[#8b949e]">setup.exe</span>
                    </div>
                    <span className="text-[#2ea043]">→ drag onto →</span>
                    <div className="bg-[#238636] rounded px-3 py-2">
                      <span className="text-white">RunAsUser_Fix.bat</span>
                    </div>
                  </div>
                </div>
                <p className="text-[#8b949e] text-sm mt-4">
                  Works with any installer from any folder!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Use */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">
            <span className="text-[#2ea043]">&gt;</span> How to Use
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
              <div className="text-[#2ea043] text-3xl font-bold mb-2">01</div>
              <h3 className="font-semibold mb-2">Place files together</h3>
              <p className="text-[#8b949e] text-sm mb-3">
                Put the .bat file in the same folder as your installer
              </p>
              <div className="rounded overflow-hidden border border-[#30363d]">
                <img src="/fix-user-scope-installation-error/images/1.png" alt="Step 1: Files in folder" className="w-full" />
              </div>
            </div>
            <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
              <div className="text-[#2ea043] text-3xl font-bold mb-2">02</div>
              <h3 className="font-semibold mb-2">Drag installer onto .bat</h3>
              <p className="text-[#8b949e] text-sm mb-3">
                Drag the .exe file onto the RunAsUser_Fix.bat icon
              </p>
              <div className="rounded overflow-hidden border border-[#30363d]">
                <img src="/fix-user-scope-installation-error/images/2.png" alt="Step 2: Dragging file" className="w-full" />
              </div>
            </div>
            <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
              <div className="text-[#2ea043] text-3xl font-bold mb-2">03</div>
              <h3 className="font-semibold mb-2">Drop &amp; Done!</h3>
              <p className="text-[#8b949e] text-sm mb-3">
                Release to run installer without admin conflicts
              </p>
              <div className="rounded overflow-hidden border border-[#30363d]">
                <img src="/fix-user-scope-installation-error/images/3.png" alt="Step 3: Drop to run" className="w-full" />
              </div>
            </div>
          </div>
          <p className="text-[#8b949e] text-sm text-center mt-4">
            Note: Do NOT double-click the .bat file first. Drag the .exe directly onto the .bat icon in File Explorer.
          </p>
        </section>

        {/* Advanced Option */}
        <section className="mb-12">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full text-left bg-[#161b22] border border-[#30363d] rounded-lg p-4 flex items-center justify-between hover:border-[#2ea043] transition-colors max-w-2xl mx-auto"
          >
            <span className="font-semibold">
              <span className="text-[#2ea043]">&gt;</span> Advanced: Generate Custom Command
            </span>
            <span className="text-[#2ea043]">{showAdvanced ? "[-]" : "[+]"}</span>
          </button>
          {showAdvanced && (
            <div className="terminal max-w-2xl mx-auto mt-4">
              <div className="terminal-header">
                <div className="terminal-dot bg-[#f85149]"></div>
                <div className="terminal-dot bg-[#d29922]"></div>
                <div className="terminal-dot bg-[#2ea043]"></div>
                <span className="text-[#8b949e] text-sm ml-2">Command Generator</span>
              </div>
              <div className="terminal-body">
                <div className="mb-4">
                  <label className="block text-[#8b949e] text-sm mb-2">
                    <span className="text-[#2ea043]">$</span> Enter installer filename:
                  </label>
                  <input
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    placeholder="e.g., VSCodeUserSetup-x64-1.85.0.exe"
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded px-4 py-3 text-[#c9d1d9] placeholder-[#484f58] focus:outline-none focus:border-[#2ea043] font-mono"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-[#8b949e] text-sm mb-2">
                    <span className="text-[#2ea043]">$</span> Copy this command to CMD:
                  </label>
                  <div className="bg-[#0d1117] border border-[#30363d] rounded p-4 relative">
                    <code className="text-[#2ea043] break-all">{command}</code>
                    <button
                      onClick={copyToClipboard}
                      disabled={!fileName.trim()}
                      className={`absolute top-2 right-2 px-3 py-1 rounded text-sm transition-all ${
                        fileName.trim()
                          ? "bg-[#238636] hover:bg-[#2ea043] text-white cursor-pointer"
                          : "bg-[#30363d] text-[#484f58] cursor-not-allowed"
                      }`}
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
                <p className="text-[#8b949e] text-xs">
                  Run this command in CMD from the same folder as your installer.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Self Diagnosis */}
        <section className="mb-12">
          <button
            onClick={() => setShowTroubleshoot(!showTroubleshoot)}
            className="w-full text-left bg-[#161b22] border border-[#30363d] rounded-lg p-4 flex items-center justify-between hover:border-[#2ea043] transition-colors"
          >
            <span className="font-semibold">
              <span className="text-[#2ea043]">&gt;</span> Troubleshooting Checklist
            </span>
            <span className="text-[#2ea043]">{showTroubleshoot ? "[-]" : "[+]"}</span>
          </button>
          {showTroubleshoot && (
            <div className="bg-[#161b22] border border-t-0 border-[#30363d] rounded-b-lg p-6 -mt-1">
              <p className="text-[#8b949e] mb-4">
                Before using the fix, check these common causes:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1 accent-[#2ea043]" />
                  <span className="text-sm">
                    Did you uncheck &quot;Run as administrator&quot; in Properties → Compatibility tab?
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1 accent-[#2ea043]" />
                  <span className="text-sm">
                    Are you running from a network drive or shared folder? (Try local drive)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1 accent-[#2ea043]" />
                  <span className="text-sm">
                    Is your Windows UAC (User Account Control) enabled?
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1 accent-[#2ea043]" />
                  <span className="text-sm">
                    Have you tried right-clicking the installer and NOT selecting &quot;Run as administrator&quot;?
                  </span>
                </li>
              </ul>
              <p className="text-[#8b949e] text-sm mt-4">
                If you&apos;ve checked all of these and still have the issue, use the fix generator above.
              </p>
            </div>
          )}
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">
            <span className="text-[#2ea043]">&gt;</span> FAQ
          </h2>
          <div className="space-y-4">
            <details className="bg-[#161b22] border border-[#30363d] rounded-lg">
              <summary className="p-4 cursor-pointer hover:bg-[#1c2128] transition-colors">
                What does <code className="text-[#2ea043]">runas /trustlevel:0x20000</code> do?
              </summary>
              <div className="px-4 pb-4 text-[#8b949e] text-sm">
                This command runs a program with &quot;Basic User&quot; privileges, even if you&apos;re logged in as an
                administrator. The <code className="text-[#2ea043]">0x20000</code> trust level forces the program
                to run without elevated (admin) privileges, bypassing the UAC admin token inheritance.
              </div>
            </details>
            <details className="bg-[#161b22] border border-[#30363d] rounded-lg">
              <summary className="p-4 cursor-pointer hover:bg-[#1c2128] transition-colors">
                Is this safe to use?
              </summary>
              <div className="px-4 pb-4 text-[#8b949e] text-sm">
                Yes! This uses Windows&apos; built-in <code className="text-[#2ea043]">runas</code> command.
                It doesn&apos;t modify any system files or registry settings. It simply tells Windows to run
                your installer with standard user permissions instead of administrator privileges.
              </div>
            </details>
            <details className="bg-[#161b22] border border-[#30363d] rounded-lg">
              <summary className="p-4 cursor-pointer hover:bg-[#1c2128] transition-colors">
                Which programs does this work with?
              </summary>
              <div className="px-4 pb-4 text-[#8b949e] text-sm">
                This fix works with any &quot;User Installer&quot; type applications, including:
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Visual Studio Code (User Setup)</li>
                  <li>Cursor IDE</li>
                  <li>Antigravity</li>
                  <li>Any Electron-based app with user-scope installer</li>
                </ul>
              </div>
            </details>
            <details className="bg-[#161b22] border border-[#30363d] rounded-lg">
              <summary className="p-4 cursor-pointer hover:bg-[#1c2128] transition-colors">
                Why does this error happen?
              </summary>
              <div className="px-4 pb-4 text-[#8b949e] text-sm">
                &quot;User Installers&quot; are designed to install programs in your user profile folder
                (like <code className="text-[#2ea043]">%LOCALAPPDATA%</code>) without needing admin rights.
                When you run them as administrator, Windows tries to install to the Administrator&apos;s
                profile instead, which causes conflicts with updates and permissions.
              </div>
            </details>
          </div>
        </section>

        {/* Technical Explanation */}
        <section className="mb-12">
          <div className="terminal max-w-2xl mx-auto">
            <div className="terminal-header">
              <div className="terminal-dot bg-[#f85149]"></div>
              <div className="terminal-dot bg-[#d29922]"></div>
              <div className="terminal-dot bg-[#2ea043]"></div>
              <span className="text-[#8b949e] text-sm ml-2">Technical Info</span>
            </div>
            <div className="terminal-body text-sm">
              <p className="text-[#8b949e] mb-2">
                <span className="text-[#2ea043]">$</span> # How it works
              </p>
              <p className="text-[#c9d1d9] mb-4">
                Windows UAC creates two tokens for admin users: an elevated token and a basic user token.
                The <code className="text-[#2ea043]">runas /trustlevel:0x20000</code> command forces
                a process to use the basic user token, effectively &quot;de-elevating&quot; your privileges.
              </p>
              <p className="text-[#8b949e] mb-2">
                <span className="text-[#2ea043]">$</span> # Trust Levels
              </p>
              <p className="text-[#c9d1d9]">
                <code className="text-[#d29922]">0x20000</code> = Basic User (what we use)<br />
                <code className="text-[#d29922]">0x40000</code> = Administrator
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#30363d] py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-[#8b949e] text-sm">
          <p className="mb-4">
            <span className="text-[#2ea043]">&gt;_</span> RunAsUser - The User-Scope Installer Fixer
          </p>
          <p className="text-xs">
            Keywords: User scope installation error fix, Updates are disabled administrator,
            Run as invoker Windows 10/11, VS Code user setup admin error, Antigravity update fail
          </p>
        </div>
      </footer>
    </div>
  );
}
