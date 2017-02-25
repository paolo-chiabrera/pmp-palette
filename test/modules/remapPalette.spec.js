import { expect } from 'chai';

import remapPalette from '../../lib/modules/remapPalette';

import mocks from '../mocks';

describe('remapPalette', () => {
	it('should be a function', () => {
		expect(remapPalette).to.be.a('function');
	});

	describe('when called', () => {
		it('should return the remapped palette', () => {
			const remappedPalette = remapPalette({
				palette: mocks.palette
			});

			const EXPECTED = {
				vibrant: {
					hex: '#000000',
					population: 100
				}
			};

			expect(remappedPalette).to.deep.equal(EXPECTED);
		});
	});
});
