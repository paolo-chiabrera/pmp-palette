import { mapLimit } from 'async';
import { mapValues, noop } from 'lodash';
import vibrant from 'node-vibrant';

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

        next(null, mapValues(palette, swatch => {
          if (!swatch) {
            return null;
          }

          return {
            hex: swatch.getHex(),
            population: swatch.getPopulation()
          };
        }));
      });
  }, done);
}
