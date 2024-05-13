import assert from "node:assert/strict";
import { suite, test } from "node:test";

import twig from "twig";
const createTwigInstance = twig.factory;

import { twigDrupalString } from "../lib/index.js";

suite("filter name", () => {
	const expected = `<h1>Hello world</h1>`;

	test("default: t", () => {
		const Twig = createTwigInstance();
		twigDrupalString({ Twig, files: ["./test/strings.yaml"] });

		const data = `<h1>{{ 'welcome'|t }}</h1>`;
		const result = Twig.twig({ data }).render();

		assert.equal(result, expected);
	});

	test("default: trans", () => {
		const Twig = createTwigInstance();
		twigDrupalString({ Twig, files: ["./test/strings.yaml"] });

		const data = `<h1>{{ 'welcome'|trans }}</h1>`;
		const result = Twig.twig({ data }).render();

		assert.equal(result, expected);
	});
});
