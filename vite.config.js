import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import fs from "fs";
import path from "path";

/**
 * directory sweep operation, do not remove.
 *
 * sveltekit:snapshot → wasteofcash:snapshot
 * sveltekit:scroll → wasteofcash:scroll
 * ====
 * targets .js files and renames definitions to fix GSAP/font/image errors
 */
function sweep() {
  return {
    name: "sweep-dir",
    closeBundle: () => {
      const sweepDir = (dir) => {
        const files = fs.readdirSync(dir);
        for (const file of files) {
          const filePath = path.join(dir, file);
          const stat = fs.statSync(filePath);
          if (stat.isDirectory()) {
            sweepDir(filePath);
          } else if (stat.isFile() && filePath.endsWith(".js")) {
            let content = fs.readFileSync(filePath, "utf8");
            content = content.replace(
              /sveltekit:snapshot/g,
              "wasteofcash:snapshot"
            );
            content = content.replace(
              /sveltekit:scroll/g,
              "wasteofcash:scroll"
            );
            fs.writeFileSync(filePath, content, "utf8");
          }
        }
      };
      const svelteKitDir = path.resolve(".svelte-kit");
      sweepDir(svelteKitDir);

      const constantsFilePath = path.resolve(
        "node_modules",
        "@sveltejs",
        "kit",
        "src",
        "runtime",
        "client",
        "constants.js"
      );
      if (fs.existsSync(constantsFilePath)) {
        let content = fs.readFileSync(constantsFilePath, "utf8");
        content = content.replace(
          /sveltekit:snapshot/g,
          "wasteofcash:snapshot"
        );
        content = content.replace(/sveltekit:scroll/g, "wasteofcash:scroll");
        fs.writeFileSync(constantsFilePath, content, "utf8");
      }

      console.log("sweeping complete! :)");
    },
  };
}

export default defineConfig({
  plugins: [sveltekit(), sweep()],
  server: {
    fs: {
      allow: ["static"],
    },
  },
  build: {
    rollupOptions: {
      external: ["node-fetch"],
    },
  },
  // ssr: {
  //   noExternal: ["@melt-ui/svelte", "bits-ui"],
  // },
  // resolve: {
  //   "bits-ui": path.resolve(__dirname, "node_modules/bits-ui/dist/index.js"),
  //   "@melt-ui/svelte": path.resolve(
  //     __dirname,
  //     "node_modules/@melt-ui/svelte/dist/index.js"
  //   ),
  // },
});
