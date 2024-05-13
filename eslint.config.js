import js from "@eslint/js";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";

export default [
	{
		files: ["**/*.js"],
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
		plugins: {
			"simple-import-sort": simpleImportSort,
		},
		rules: {
			...js.configs.recommended.rules,
			"simple-import-sort/imports": "error",
			"simple-import-sort/exports": "error",
		},
	},
];
