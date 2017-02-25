import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

import vibrant from 'node-vibrant';

import getImagesPalette from '../../lib/modules/getImagesPalette';

import mocks from '../mocks';

function mockVibrantGetPalette (err, res) {
	sinon.stub(vibrant, 'from', () => {
		return {
			getPalette: callback => callback(err, res)
		};
	});
}

describe('getImagesPalette', () => {
	it('should be a function', () => {
		expect(getImagesPalette).to.be.a('function');
	});

	describe('when called', () => {
		const callback = sinon.spy();
		const args = {
			folderPath: '',
			images: mocks.images
		};

		afterEach(() => {
			callback.reset();
			vibrant.from.restore();
		});

		it('should return an error: generic', () => {
			const fakeError = new Error('fake');

			mockVibrantGetPalette(fakeError);

			getImagesPalette(args, callback);

			expect(callback).to.have.been.calledWith(fakeError);
		});

		it('should return the images palette', () => {
			const EXPECTED = [
				{
					data: {
						palette: {
							vibrant: {
								hex: '#000000',
								population: 100
							}
						}
					},
					filename: 'fake'
				}
			];

			mockVibrantGetPalette(null, mocks.palette);

			getImagesPalette(args, callback);

			expect(callback).to.have.been.calledWith(null, EXPECTED);
		});
	});
});
