import assert from "node:assert/strict";
import test from "node:test";

import Twig from "twig";

import { twigDrupalString } from "../lib/index.js";

twigDrupalString({ Twig, files: ["./test/strings.yaml"] });

test("basic", async (t) => {
	const expected = `<h1>Hello world</h1>`;

	await t.test("t", () => {
		const data = `<h1>{{ 'welcome'|t }}</h1>`;
		const result = Twig.twig({ data }).render();

		assert.equal(result, expected);
	});

	await t.test("trans", () => {
		const data = `<h1>{{ 'welcome'|trans }}</h1>`;
		const result = Twig.twig({ data }).render();

		assert.equal(result, expected);
	});
});

test("placeholder", async (t) => {
	const expected = `<h1>Hello world</h1>`;

	await t.test("t", () => {
		const data = `<h1>{{ 'greeting'|t({'@name': 'world'}) }}</h1>`;
		const result = Twig.twig({ data }).render();

		assert.equal(result, expected);
	});

	await t.test("trans", () => {
		const data = `<h1>{{ 'greeting'|trans({'@name': 'world'}) }}</h1>`;
		const result = Twig.twig({ data }).render();

		assert.equal(result, expected);
	});
});

test("not found", async (t) => {
	const expected = `<h1>goodbye</h1>`;

	await t.test("t", () => {
		const data = `<h1>{{ 'goodbye'|t }}</h1>`;
		const result = Twig.twig({ data }).render();

		assert.equal(result, expected);
	});

	await t.test("trans", () => {
		const data = `<h1>{{ 'goodbye'|trans }}</h1>`;
		const result = Twig.twig({ data }).render();

		assert.equal(result, expected);
	});
});

test("no default", async (t) => {
	const expected = `<h1>see.ya</h1>`;

	await t.test("t", () => {
		const data = `<h1>{{ 'see.ya'|t }}</h1>`;
		const result = Twig.twig({ data }).render();

		assert.equal(result, expected);
	});

	await t.test("trans", () => {
		const data = `<h1>{{ 'see.ya'|trans }}</h1>`;
		const result = Twig.twig({ data }).render();

		assert.equal(result, expected);
	});
});
