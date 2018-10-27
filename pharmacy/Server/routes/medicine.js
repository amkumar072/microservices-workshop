var express = require('express');
var router = express.Router();
var lodash = require('lodash');
var uuidv1 = require('uuid/v1');

var pharmacyJson = require('../jsonData/pharmacyJson').pharmacy

router.get('/', (req, res) => {
    res.status(200)
        .send({
            Status: 'Success',
            Pharmacy: pharmacyJson
        })
})

router.get('/:id', async (req, res) => {
    if (req.params.id != null) {
        try {
            var result = lodash.find(pharmacyJson, { id: req.params.id })
            res.status(200)
                .send({
                    Status: 'Success',
                    Pharmacy: result
                })
        }
        catch (e) {
            res.status(404)
                .send({
                    Status: 'Fail',
                    Message: 'Error while Fetching Record'
                })
        }
    }
    else {
        res.status(404)
            .send({
                Status: 'Fail',
                Message: 'Id is not passed'
            })
    }
})

router.post('/', async (req, res) => {
    if (req.body.Name != null &&
        req.body.BatchNo != null &&
        req.body.ExpirationDate != null &&
        req.body.Price != null &&
        req.body.Type != null) {
        try {
            const pharmacySave = {
                id: uuidv1(),
                Name: req.body.Name,
                BatchNo: req.body.BatchNo,
                ExpirationDate: req.body.ExpirationDate,
                Price: req.body.Price,
                Type: req.body.Type
            }
            // console.log(pharmacySave);

            await pharmacyJson.push(pharmacySave);
            res.status(200)
                .send({
                    Status: 'Success',
                    Message: 'Saved Successfully'
                })
        }
        catch (e) {
            res.status(404)
                .send({
                    Status: 'Fail',
                    Message: 'Error while Saving Record'
                })
        }
    }
    else {
        res.status(404)
            .send({
                Status: 'Fail',
                Message: 'Details are not passed'
            })
    }
})

router.delete('/:id', async (req, res) => {
    if (req.params.id != null) {
        try {
            var result = await lodash.remove(pharmacyJson, { id: req.params.id });
            if (result.length > 0) {
                res.status(200)
                    .send({
                        Status: 'Success',
                        Message: 'Deleted Successfully'
                    })
            }
            else {
                res.status(404)
                    .send({
                        Status: 'Fail',
                        Message: 'Record not found'
                    })
            }
        }
        catch (e) {
            res.status(404)
                .send({
                    Status: 'Fail',
                    Message: 'Error while Deleting Record'
                })
        }
    }
    else {
        res.status(404)
            .send({
                Status: 'Fail',
                Message: 'Id is not passed'
            })
    }
})

/* router.put('/:id', async (req, res) => {
    if (req.params.id != null) {
        console.log("params" + req.params.id)
        try {
            var result = await lodash.find(pharmacyJson, { id: req.params.id })
            console.log("Find =" + result.id)
            if (result.id === req.params.id) {
                if (req.body.Name != null && req.body.BatchNo != null && req.body.ExpirationDate != null &&
                    req.body.Price != null && req.body.Type != null) {
                    const pharmacyUpdate = {
                        id: req.params.id,
                        Name: req.body.Name,
                        BatchNo: req.body.BatchNo,
                        ExpirationDate: req.body.ExpirationDate,
                        Price: req.body.Price,
                        Type: req.body.Type
                    }

                      await lodash.remove(pharmacyJson, { id: req.params.id })
                      await pharmacyJson.push(pharmacyUpdate);
                    // await pharmacyJson.splice(result, 1, pharmacyUpdate)
                    res.status(200)
                        .send({
                            Status: 'Success',
                            Pharmacy: 'Updated Successfully'
                        })
                }
            }
            else {
                res.status(200)
                    .send({
                        Status: 'Fail',
                        Message: 'ID is not found'
                    })
            }


        }
        catch (e) {
            res.status(404)
                .send({
                    Status: 'Fail',
                    Message: 'Error while Update Record'
                })
        }
    }
    else {
        res.status(404)
            .send({
                Status: 'Fail',
                Message: 'Id is not passed'
            })
    }
}) */

router.put('/:id', async (req, res) => {
    if (req.params.id != null) {
        let update = false;
        // console.log("params" + req.params.id)
        try {
            pharmacyJson.forEach(
                (pha) => {
                    //  console.log(pha.id);
                    if (pha.id === req.params.id) {
                        //  console.log(pha);
                        pha.Name = req.body.Name;
                        pha.BatchNo = req.body.BatchNo;
                        pha.ExpirationDate = req.body.ExpirationDate;
                        pha.Price = req.body.Price;
                        pha.Type = req.body.Type;
                        // console.log(pha);
                        update = true;
                    }
                })
            if (update) {
                res.status(200)
                    .send({
                        Status: 'Success',
                        Pharmacy: 'Updated Successfully'
                    })
            } else {
                res.status(404)
                    .send({
                        Status: 'Fail',
                        Message: 'ID is not found'
                    })
            }

        }
        catch (e) {
            res.status(404)
                .send({
                    Status: 'Fail',
                    Message: 'Error while Update Record'
                })
        }
    }
    else {
        res.status(404)
            .send({
                Status: 'Fail',
                Message: 'Id is not passed'
            })
    }
})

module.exports = router;