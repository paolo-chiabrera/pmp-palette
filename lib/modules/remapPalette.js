import { camelCase, each } from 'lodash';

export default function remapPalette (args) {
	const { palette } = args;

	const remappedPalette = {};

	each(palette, (swatch, key) => {
		const CAMEL_KEY = camelCase(key);

		if (!swatch) {
			return;
		}

		remappedPalette[CAMEL_KEY] = {
			hex: swatch.getHex(),
			population: swatch.getPopulation()
		};
	});

	return remappedPalette;
}
