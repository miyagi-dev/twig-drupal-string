import assert from "node:assert/strict";
import { suite, test } from "node:test";

import twig from "twig";
const createTwigInstance = twig.factory;

import { twigDrupalString } from "../lib/index.js";

suite("string key", () => {
	test("missing", () => {
		const Twig = createTwigInstance();
		twigDrupalString({ Twig, files: ["./test/strings.yaml"] });

		const data = `<h1>{{ 'goodbye'|t }}</h1>`;
		const result = Twig.twig({ data }).render();
		const expected = `<h1>goodbye</h1>`;

		assert.equal(result, expected);
	});
});
