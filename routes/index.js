
/*
 * GET home page.
 */
exports.index = function(req, res){
    var phrases = ["to poop a duke","to take a deuce","to download a google","to do the dougie","to drown the wolf bait","to clean the bagpipes","to force a double play","to bury the elf","to build a log cabin","to drill for mud bunnies","to slap the podge","to drop the chalupa","to feed the fish","to hang a grogan","to go hound doggin'","to lay the pipe","to pinch a loaf","to make a Michigan hand warmer","to squeeze one out","to bring it home","to bake brownies","to heave the sherpa"];
    var showInitial = false;
    var celebInfoFound = false;
    var phrase = phrases[(Math.random() * phrases.length) | 0];
    var celeb = '';
    if(!req.query.name){
        res.render('index.hbs', { celeb: celeb, phrase: phrase, celebInfoFound:celebInfoFound, showInitial:true });
        return;
    }
    var name = req.query.name.trim().replace(/\s+/g, "-");
    var request = require('request');
    var cheerio = require('cheerio');
    var url = 'http://celebnetworth.org/' + name + '-net-worth-salary';
    var amount = '';
    var poopTimeInMinutes = 8;

    request(url, function(err, resp, body) {
        if (err)
            throw err;
        $ = cheerio.load(body);
        if($('.networthtitle p').length > 0){
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
                    celebInfoFound = true;
                }
            });
        }
        var prettyName =req.query.name.toLowerCase().replace(/\b[a-z](?=[a-z]{2})/g, function(letter) {
            return letter.toUpperCase(); } );
        celeb =  prettyName;
        res.render('index.hbs', { celeb: celeb, cost: amount, phrase: phrase, celebInfoFound:celebInfoFound, showInitial:showInitial });
    });

};