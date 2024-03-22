import Twig from "twig";

type Options = {
	/** Twig engine instance */
	Twig: typeof Twig;

	/** Paths to translation string files */
	files: string[];

	/** Enable watch mode (disabled by default) */
	watch?: boolean;
};

type FilterParameters =
	| [
			{
				[x: string]: string;
				_keys?: string[];
			}?,
			...any,
	  ]
	| false;

type Translations = {
	[x: string]: {
		default: string;
	};
};
