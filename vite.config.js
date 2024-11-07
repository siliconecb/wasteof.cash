import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import fs from "fs";
import path from "path";

function sweepPlugin() {
  return {
    name: "sweep-plugin",
    closeBundle: () => {
      const dir = path.resolve(".svelte-kit");
      const sweep = (dir) => {
        const files = fs.readdirSync(dir);
        for (const file of files) {
          const filePath = path.join(dir, file);
          const stat = fs.statSync(filePath);
          if (stat.isDirectory()) {
            sweep(filePath);
          } else if (stat.isFile()) {
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
      sweep(dir);
      console.log("sweeping complete! :)");
    },
  };
}

export default defineConfig({
  plugins: [sveltekit(), sweepPlugin()],
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
  ssr: {
    noExternal: ["@melt-ui/svelte", "bits-ui"],
  },
});
