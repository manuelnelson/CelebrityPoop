
/*
 * GET home page.
 */
exports.index = function(req, res){
    var phrases = ["poop a duke","take a deuce","download a google","do the dougie","drown the wolf bait","clean the bagpipes","force a double play","bury the elf","build a log cabin","drill for mud bunnies","slap the podge","drop the chalupa","feed the fish","hang a grogan","go hound doggin'","lay the pipe","pinch a loaf","make a Michigan hand warmer","squeeze one out","bring it home","bake brownies","heave the sherpa"];
    var name = req.query.name.trim().replace(/\s+/g, "-");
    var request = require('request');
    var cheerio = require('cheerio');
    var url = 'http://celebnetworth.org/' + name + '-net-worth-salary';
    var phrase = phrases[(Math.random() * phrases.length) | 0];
    var celeb = '';
    var amount = '';
    var poopTimeInMinutes = 8;
    request(url, function(err, resp, body) {
        if (err)
            throw err;
        $ = cheerio.load(body);
        $('.networthtitle p').each(function(ndx, value){
            if(ndx == 1){
                amount = $(value).html().replace(/<.*?>.*?<\/.*?>/, "").replace(':','').replace('$','');
                if(amount.indexOf('million') > -1){
                    console.log(amount);
                    amount = parseInt(amount.replace("million", ""));
                    console.log(amount);
                    amount=amount*1000000;
                }
                amount = '$' + Math.round((amount*poopTimeInMinutes)/(365*24*60));
            }

        });
        celeb = req.query.name  + ' ' + amount;
        res.render('index.hbs', { celeb: celeb, phrase: phrase });
    });

};