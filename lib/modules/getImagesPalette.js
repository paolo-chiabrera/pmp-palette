import { mapLimit } from 'async';
import { noop } from 'lodash';
import vibrant from 'node-vibrant';

import remapPalette from './remapPalette';

const CONCURRENCY = 4;

export default function getImagesPalette (args, done = noop) {
	const { folderPath, images } = args;

	mapLimit(images, CONCURRENCY, (image, next) => {
		const { filename } = image;

		vibrant
		.from(`${ folderPath }/${ filename }`)
		.getPalette((err, palette) => {
			if (err) {
				return next(err);
			}

			next(null, {
				data: {
					palette: remapPalette({
						palette
					})
				},
				filename
			});
		});
	}, done);
}
