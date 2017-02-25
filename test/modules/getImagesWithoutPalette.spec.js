import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

import needle from 'needle';

import getImagesWithoutPalette from '../../lib/modules/getImagesWithoutPalette';

import mocks from '../mocks';

function mockNeedleGet (err, res) {
	sinon.stub(needle, 'get', (url, options, callback) => {
		callback(err, res);
	});
}

describe('getImagesWithoutPalette', () => {
	it('should be a function', () => {
		expect(getImagesWithoutPalette).to.be.a('function');
	});

	describe('when called', () => {
		const callback = sinon.spy();
		const args = {
			limit: 0,
			pmpApiUrl: '',
			request: mocks.request
		};

		afterEach(() => {
			callback.reset();
			needle.get.restore();
		});

		it('should return an error: generic', () => {
			const fakeError = new Error('fake');

			mockNeedleGet(fakeError);

			getImagesWithoutPalette(args, callback);

			expect(callback).to.have.been.calledWith(fakeError);
		});

		it('should return an error: invalid response', () => {
			const responseError = new Error('response is invalid');

			mockNeedleGet(null, {});

			getImagesWithoutPalette(args, callback);

			expect(callback).to.have.been.calledWith(responseError);
		});

		it('should return an error: no more images without palette', () => {
			const noImagesError = new Error('no more images without palette');

			mockNeedleGet(null, {
				body: []
			});

			getImagesWithoutPalette(args, callback);

			expect(callback).to.have.been.calledWith(noImagesError);
		});

		it('should return the response body', () => {
			mockNeedleGet(null, {
				body: ['test']
			});

			getImagesWithoutPalette(args, callback);

			expect(callback).to.have.been.calledWith(null, {
				images: ['test']
			});
		});
	});
});
