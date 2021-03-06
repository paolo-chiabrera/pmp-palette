import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

import needle from 'needle';

import saveImagesPalette from '../../lib/modules/saveImagesPalette';

import mocks from '../mocks';

function mockNeedlePut (err, res) {
	sinon.stub(needle, 'put', (url, payload, options, callback) => {
		callback(err, res);
	});
}

describe('saveImagesPalette', () => {
	it('should be a function', () => {
		expect(saveImagesPalette).to.be.a('function');
	});

	describe('when called', () => {
		const callback = sinon.spy();
		const args = {
			payload: {},
			pmpApiUrl: '',
			request: mocks.request
		};

		afterEach(() => {
			callback.reset();
			needle.put.restore();
		});

		it('should return an error: generic', () => {
			const fakeError = new Error('fake');

			mockNeedlePut(fakeError);

			saveImagesPalette(args, callback);

			expect(callback).to.have.been.calledWith(fakeError);
		});

		it('should return an error: invalid response', () => {
			const responseError = new Error('response is invalid');

			mockNeedlePut(null, {});

			saveImagesPalette(args, callback);

			expect(callback).to.have.been.calledWith(responseError);
		});

		it('should return the response body', () => {
			const body = 'test';

			mockNeedlePut(null, {
				body
			});

			saveImagesPalette(args, callback);

			expect(callback).to.have.been.calledWith(null, body);
		});
	});
});
