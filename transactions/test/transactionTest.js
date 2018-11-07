var expect = require('chai').expect;
var request = require('request');

//  "prestart":"cd .. && cd ./transaction-client && npm run-script build",

describe('file Data Fetch', function () {
    it('File Read Status', function (done) {
        request('http://localhost:3001/transactions', function (err, res) {
            //  console.log(res)
            expect(res.statusCode).to.equal(200);
            done();
        })
    })
    it('File Result', function (done) {
        request('http://localhost:3001/transactions', function (err, res, body) {
           let bodyResult = JSON.parse(body)
            expect(bodyResult.message).to.equal("Success");
            done();
        })
    })
})