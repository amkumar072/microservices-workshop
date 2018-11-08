var express = require('express');
var router = express.Router();
var fs = require('fs');
var transactions = require('../data/transactions.json').transactions

router.get('/', function (req, res, next) {
    res.status(200).send({
        message: 'success',
        transactions
    })
});

router.get('/1', function (req, res, next) {
    try {
        var transactionsLocal = fs.readFileSync('./data/transactions.json');
        console.log(transactionsLocal)
        let transactionsValue = JSON.parse(transactionsLocal);
        console.log(transactionsValue);

        res.status(200).send({
            message: 'success',
            transactions
        })
    }
    catch{
        res.status(500).send({
            message: 'fail',
            error: 'Error while fetching'
        })
    }
});

router.get('/sort2', function (req, res, next) {
    try {
        var inputQuery = req.query.name
        var isQueryFind = false;
        var transactionsLocal = fs.readFileSync('./data/transactions.json');
        // console.log(transactionsLocal)
        let transactionsValue = JSON.parse(transactionsLocal);
        //   console.log(transactionsValue);

        transactionsValue.transactions.map((x) => {
            Object.keys(x).map(s => {
                if (s === inputQuery) {
                    isQueryFind = true
                }
            })
        })
        //    console.log(isQueryFind);
        if (isQueryFind) {
            var result = transactionsValue.transactions.sort((x, y) => x[inputQuery] - y[inputQuery])
            res.status(200).send({
                message: 'success',
                transactions: result
            })
        } else {
            res.status(500).send({
                message: 'fail',
                error: 'Input params not match'
            })
        }
    }
    catch{
        res.status(500).send({
            message: 'fail',
            error: 'Error while fetching'
        })
    }
});


router.get('/date2', function (req, res, next) {
    try {
        var fromDate = req.query.fromDate;
        var toDate = req.query.toDate;
        var isQueryFind = false;
        var transactionsResult = [];
        var transactionsLocal = fs.readFileSync('./data/transactions.json');
        // console.log(transactionsLocal)
        let transactionsValue = JSON.parse(transactionsLocal);
        //   console.log(transactionsValue);

        transactionsValue.transactions.map((x) => {
            if (Date.parse(x.date) > Date.parse(fromDate) &&
                Date.parse(x.date) < Date.parse(toDate)) {
                transactionsResult.push(x);
                isQueryFind = true;
            }
        })
        console.log(isQueryFind);
        if (isQueryFind) {
            // var result = transactionsValue.transactions.sort((x, y) => x[inputQuery] - y[inputQuery])
            res.status(200).send({
                message: 'success',
                transactions: transactionsResult
            })
        } else {
            res.status(500).send({
                message: 'fail',
                error: 'Input params not match'
            })
        }
    }
    catch{
        res.status(500).send({
            message: 'fail',
            error: 'Error while fetching'
        })
    }
});

module.exports = router;
