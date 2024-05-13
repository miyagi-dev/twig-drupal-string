import assert from "node:assert/strict";
import { suite, test } from "node:test";

import twig from "twig";
const createTwigInstance = twig.factory;

import { twigDrupalString } from "../lib/index.js";

suite("default value", () => {
	test("missing", () => {
		const Twig = createTwigInstance();
		twigDrupalString({ Twig, files: ["./test/strings.yaml"] });

		const data = `<h1>{{ 'see.ya'|t }}</h1>`;
		const result = Twig.twig({ data }).render();
		const expected = `<h1>see.ya</h1>`;

		assert.equal(result, expected);
	});
});
