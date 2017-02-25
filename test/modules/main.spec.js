import { expect } from 'chai';

import main from '../../lib/modules/main';

describe('main', () => {
	it('should be an object', () => {
		expect(main).to.be.an('object');
	});

	it('should expose generateImagesPaletteByLimit', () => {
		expect(main.generateImagesPaletteByLimit).to.be.a('function');
	});

	it('should expose getImagesPalette', () => {
		expect(main.getImagesPalette).to.be.a('function');
	});

	it('should expose getImagesWithoutPalette', () => {
		expect(main.getImagesWithoutPalette).to.be.a('function');
	});

	it('should expose remapPalette', () => {
		expect(main.remapPalette).to.be.a('function');
	});

	it('should expose saveImagesPalette', () => {
		expect(main.saveImagesPalette).to.be.a('function');
	});
});
