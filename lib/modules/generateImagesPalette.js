import { forever } from 'async';
import { isArray, noop } from 'lodash';

import main from './main';

export default function generateImagesPalette (args, done = noop) {
  const { folderPath, pmpApiUrl, request } = args;
  let pageNumber = 0;
  let _err = null;

  forever(next => {
    main.getImagesWithoutPaletteByPage({
      pmpApiUrl,
      pageNumber,
      request
    }, (err, images) => {
      if (err) {
        _err = err;
        return next(err);
      }

      if (!isArray(images) || images.length <= 0) {
        return next(true);
      }

      pageNumber++;

      main.getImagesPalette({
        folderPath,
        images
      }, next);
    });
  }, err => done(_err, {
    pageNumber
  }));
}
