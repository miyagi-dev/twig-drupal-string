import assert from "node:assert/strict";
import { suite, test } from "node:test";

import twig from "twig";
const createTwigInstance = twig.factory;

import { twigDrupalString } from "../lib/index.js";

suite("placeholder", () => {
	test("replacement", () => {
		const Twig = createTwigInstance();
		twigDrupalString({ Twig, files: ["./test/strings.yaml"] });

		const data = `<h1>{{ 'greeting'|t({'@name': 'world'}) }}</h1>`;
		const result = Twig.twig({ data }).render();
		const expected = `<h1>Hello world</h1>`;

		assert.equal(result, expected);
	});

	test("missing", () => {
		const Twig = createTwigInstance();
		twigDrupalString({ Twig, files: ["./test/strings.yaml"] });

		const data = `<h1>{{ 'greeting'|t({'@person': 'world'}) }}</h1>`;
		const result = Twig.twig({ data }).render();
		const expected = `<h1>Hello @name</h1>`;

		assert.equal(result, expected);
	});
});
