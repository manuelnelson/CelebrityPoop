
/*
 * GET home page.
 */
exports.index = function(req, res){
    var phrases = ["To clean the bagpipes","To drown the wolf bait","To force a double play","To drop the kids off at the pool"];
    var firstName = req.query.firstname;
    var lastName = req.query.lastname;
    var request = require('request');
    var cheerio = require('cheerio');
    var url = 'http://celebnetworth.org/' + firstName + '-' + lastName + '-net-worth-salary';
    var phrase = phrases[(Math.random() * phrases.length) | 0];
    var amount = 0;
    request(url, function(err, resp, body) {
        if (err)
            throw err;
        $ = cheerio.load(body);
        $('.networthtitle p').each(function(ndx, value){
            if(ndx == 1)
                amount = $(value).html().replace(/<.*?>.*?<\/.*?>/, "");
        });
        $('#celeb').text(firstName + ' ' + lastName);
        $('#phrase').text(phrase);
    });
    res.render('index', { title: 'Express' });
};