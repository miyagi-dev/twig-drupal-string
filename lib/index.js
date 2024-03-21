import fs from "node:fs";

import YAML from "yaml";

/**
 * @param {import("./types.d.ts").Options} options
 */
export function twigDrupalString({ twig, files, watch = false }) {
	let translations = getTranslations(files);

	if (watch) {
		for (const file of files) {
			try {
				fs.watch(file, () => (translations = getTranslations(files)));
			} catch (error) {
				console.error("Translation file error", error.message);
			}
		}
	}

	/**
	 * @param {string} key
	 * @param {import("./types.d.ts").FilterParameters} parameters
	 * @returns {string}
	 */
	const trans = (key, parameters) => {
		if (!translations) {
			return key;
		}

		const translation = translations[key];

		if (!translation) {
			console.warn(`Translation string ${key} missing`);
			return key;
		}

		let string = translation.default;

		if (!string) {
			console.warn(`Translation string ${key} no default`);
			return key;
		}

		if (parameters) {
			// eslint-disable-next-line no-unused-vars
			const { _keys, ...replacements } = parameters[0];

			for (const [placeholder, value] of Object.entries(replacements)) {
				string = string.replaceAll(placeholder, value);
			}
		}

		return string;
	};

	twig.extendFilter("t", trans);
	twig.extendFilter("trans", trans);
}

/**
 * @param {string[]} filePaths
 * @returns {import("./types.d.ts").Translations}
 */
function getTranslations(filePaths) {
	const files = filePaths.map(loadYAML);

	/** @type {import("./types.d.ts").Translations} */
	let translations = {};

	for (const file of files) {
		translations = { ...translations, ...file };
	}

	return translations;
}

/**
 * @param {string} filePath
 * @returns {import("./types.d.ts").Translations}
 */
function loadYAML(filePath) {
	try {
		const file = fs.readFileSync(filePath, { encoding: "utf-8" });
		return YAML.parse(file);
	} catch (error) {
		console.error("Translation file error", error.message);
		return {};
	}
}
