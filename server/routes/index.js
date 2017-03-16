var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/test/data', function(req, res, next) {
	let data = [
          {
            src: 'http://www.stylenanda.com/web/product/small/201703/219291_shop1_782337.jpg',
            name: 'server에서 가져온 데이터 이름',
            content: 'friends1 content'
          }, {
            src: 'http://www.stylenanda.com/2017/upload1/170224kej_4_11.jpg',
            name: 'server에서 가져온 데이터 이름2',
            content: 'friends2 content'
          }
        ]
	res.header('Access-Control-Allow-Origin', '*');
	res.json({testData: data});
});

module.exports = router;
