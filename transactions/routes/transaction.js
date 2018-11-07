var express = require('express');
var router = express.Router();
var fs = require('fs');


const transactions = [
    {
        id: 1,
        category: "music",
        date: "10/10/2018",
        amount: 255
    },
    {
        id: 2,
        category: "film",
        date: "10/25/2018",
        amount: 58
    }
]

/* router.get('/sort', (req, res) => {
    console.log(req.query);
    console.log(req.params)
    if (req.query.sort != null) {
        transaction.sort((x, y) => x.amount - y.amount)
        // console.log(transaction);
        res.json(transaction);
    }
    else {
        res.json(transaction);

    }
}) */

/* router.get('/', (req, res) => {

    res.status(200).send({
        message: 'Success',
        data: transactions
    })

}) */


/* router.get('/', (req, res) => {
    fs.readFile('./data/transactions.json', (err, data) => {
        if (err) {
            res.status(400).send({
                message: 'Fail',
                error: err
            })
        }
        else {
            var transactions = JSON.parse(data.toString())
            res.status(200).send({
                message: 'Success',
                data: transactions
            })
        }
    })
}) */

router.get('/', (req, res) => {
    //  console.log(req.query);
    // console.log(req.params)

    let isTransactionAvailable = false;
    let transactions = [];
    fs.readFile('./data/transactions.json', (err, data) => {
        if (err) {
            res.status(400).send({
                message: 'Fail',
                error: err
            })
        }
        else {
            if (req.query.formDate != null) {
                var transactionsLocal = JSON.parse(data.toString())
                //  console.log(transactions);

                transactionsLocal.transactions.forEach(transaction => {
                    //   console.log(transaction);
                    if (Date.parse(transaction.date) >= Date.parse(req.query.formDate) &&
                        Date.parse(transaction.date) <= Date.parse(req.query.toDate)) {
                        console.log(transaction);

                        isTransactionAvailable = true;
                        transactions.push(transaction)

                    }
                })

                if (!isTransactionAvailable) {
                    res.status(200).send({
                        message: 'No Data found',
                        data: { transactions }
                    })
                } else {
                    res.status(200).send({
                        message: 'Success',
                        data: { transactions }
                    })
                }
            } else {
                let transactions = JSON.parse(data.toString())
                res.status(200).send({
                    message: 'Success',
                    data: transactions
                })
            }
        }
    })
})


router.get('/sort', (req, res) => {
    fs.readFile('./data/transactions.json', (err, data) => {
        if (err) {
            res.status(400).send({
                message: 'Fail',
                error: err
            })
        }
        else {


            var transactions = JSON.parse(data.toString())
            //  console.log(transactions);
            transactions.transactions.sort((x, y) => x.amount - y.amount)

            res.status(200).send({
                message: 'Success',
                data: transactions
            })



        }
    })
})


router.get('/sort', function (req, res, next) {

    var isQueryFind = false;
    var inputQuery = req.query.name;
    console.log(inputQuery)
    fs.readFile("./data/transaction.json", (err, data) => {
      if (err) {
        res.status(500).send({
          message: 'fail',
          error: err
        })
  
      }
      else {
        var transactions = JSON.parse(data);
        transactions.transaction.map(trans => {
          console.log(Object.keys(trans))
          Object.keys(trans).map(x => {
            if (x === inputQuery) {
              transactions.transaction.sort((x, y) => y[inputQuery] - x[inputQuery])
  
  
              isQueryFind = true;
            }
          })
  
  
        })
        if (!isQueryFind) {
          res.status(500).send({
            message: 'fail',
            error: 'error while fetchin'
          })
  
        }
        else {
          res.status(200).send({
            message: 'success',
            data: transactions
          });
        }
  
      }
    })
  });
  

module.exports = router;