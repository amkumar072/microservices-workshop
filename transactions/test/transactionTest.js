var expect = require('chai').expect;
var request = require('request');

let transactions =
    [{ id: 1, category: 'milk', date: '11-11-2018', amount: 150 },
    { id: 2, category: 'tea', date: '12-11-2018', amount: 250 },
    { id: 3, category: 'coffee', date: '10-11-2018', amount: 50 }]

//  "prestart":"cd .. && cd ./transaction-client && npm run-script build",

describe('file Data Fetch', function () {
    it('File Read Status', function (done) {
        request('http://localhost:3000/api/transactions', function (err, res) {
            //  console.log(res)
            expect(res.statusCode).to.equal(200);
            done();
        })
    })
    it('File Result', function (done) {
        request('http://localhost:3000/api/transactions', function (err, res, body) {
            let bodyResult = JSON.parse(body)
           // console.log(transactions);
          //  console.log(bodyResult.transactions);

            expect('success').to.equal(bodyResult.message);
            expect(transactions).to.include.deep.ordered.members(bodyResult.transactions)
          
            done();
        })
    })
})