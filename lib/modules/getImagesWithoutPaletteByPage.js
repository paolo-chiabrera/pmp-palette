import { get } from 'needle';
import { isObject, noop } from 'lodash';

export default function getImagesWithoutPaletteByPage (args, done = noop) {
  const { pageNumber, pmpApiUrl, request } = args;

  const options = {
    headers: request.headers
  };

  const url = `${ pmpApiUrl }/images/without/palette/page/${ pageNumber }`;

  get(url, options, (err, res) => {
    if (err) {
      return done(err);
    }

    if (!isObject(res) || !res.body) {
      return done(new Error('res is invalid'));
    }

    done(null, res.body);
  });
}
