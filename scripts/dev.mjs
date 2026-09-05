import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

// Accept the preview service's Vite-style flags without changing the Next app.
const args = process.argv.slice(2)
  .filter((arg) => arg !== "--strictPort")
  .map((arg) => arg === "--host" ? "--hostname" : arg);
const next = fileURLToPath(import.meta.resolve("next/dist/bin/next"));
const child = spawn(process.execPath, [next, "dev", ...args], { stdio: "inherit" });

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => child.kill(signal));
}
child.on("error", (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
child.on("exit", (code, signal) => {
  process.exitCode = code ?? (signal ? 1 : 0);
});
