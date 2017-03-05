import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

import generateImagesPaletteByLimit from '../../lib/modules/generateImagesPaletteByLimit';

import main from '../../lib/modules/main';

import mocks from '../mocks';

describe('generateImagesPaletteByLimit', () => {
	it('should be a function', () => {
		expect(generateImagesPaletteByLimit).to.be.a('function');
	});

	describe('when called', () => {
		const callback = sinon.spy();
		const args = {
			folderPath: '',
			pmpApiUrl: '',
			request: mocks.request
		};

		const RESULTS = {
			getImagesWithoutPalette: {
				images: []
			},
			getImagesPalette: {},
			saveImagesPalette: {}
		};

		beforeEach(() => {
			sinon.stub(main, 'getImagesPalette', (args, callback) => {
				callback(null, RESULTS.getImagesPalette);
			});
			sinon.stub(main, 'saveImagesPalette', (args, callback) => {
				callback(null, RESULTS.saveImagesPalette);
			});
			sinon.stub(main, 'getImagesWithoutPalette', (args, callback) => {
				callback(null, RESULTS.getImagesWithoutPalette);
			});
		});

		afterEach(() => {
			callback.reset();
			main.getImagesPalette.restore();
			main.saveImagesPalette.restore();
			main.getImagesWithoutPalette.restore();
		});

		it('should return an error: getImagesWithoutPalette', () => {
			const fakeError = new Error('fake');

			main.getImagesWithoutPalette.restore();
			sinon.stub(main, 'getImagesWithoutPalette', (args, callback) => {
				callback(fakeError);
			});

			generateImagesPaletteByLimit(args, callback);

			expect(callback).to.have.been.calledWith(fakeError);
		});

		it('should return the results', () => {
			generateImagesPaletteByLimit(args, callback);

			expect(callback).to.have.been.calledWith(null, RESULTS);
		});
	});
});
