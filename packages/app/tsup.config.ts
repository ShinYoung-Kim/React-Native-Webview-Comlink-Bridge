import { defineConfig } from "tsup";

export default defineConfig({
	clean: true,
	format: ["cjs", "esm"],
	banner: { js: '"use client";' },
	minify: true,
	dts: true,
	splitting: false,
});
