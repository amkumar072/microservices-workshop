var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    var arrayFlat = [[1], [2, [3, [4]]], 5, [6, [7]]];
    // console.log(input.length)
    for (let i = 1; i < arrayFlat.length; i++) {
        arrayFlat = ([].concat(...arrayFlat));
    }
    console.log(arrayFlat)

    var objectFlat = { 0: arrayFlat}
    objectFlatResult = Object.keys(objectFlat).reduce(function (r, k) {
        return r.concat(k, objectFlat[k]);
    }, []);

    console.log(objectFlatResult);

    res.status(200).send({
        message:'success',
        arrayFlat,
        objectFlat: objectFlatResult
    })
});

module.exports = router;