import { auto } from 'async';
import { noop } from 'lodash';

import main from './main';

const IMAGES_NUMBER_LIMIT = 20;

export default function generateImagesPaletteByLimit (args, done = noop) {
	const {
		folderPath,
		limit = IMAGES_NUMBER_LIMIT,
		pmpApiUrl,
		request
	} = args;

	auto({
		getImagesWithoutPalette: next => {
			main.getImagesWithoutPalette({
				limit,
				pmpApiUrl,
				request
			}, next);
		},
		getImagesPalette: ['getImagesWithoutPalette', (results, next) => {
			const { images } = results.getImagesWithoutPalette;

			main.getImagesPalette({
				folderPath,
				images
			}, next);
		}],
		saveImagesPalette: ['getImagesPalette', (results, next) => {
			main.saveImagesPalette({
				payload: results.getImagesPalette,
				pmpApiUrl,
				request
			}, next);
		}]
	}, done);
}
