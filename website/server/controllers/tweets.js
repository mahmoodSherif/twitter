const { fakeTweet } = require("./helper");
function feed(req, res, next){
    try{
        console.log("am here");
        const tweets = [
            fakeTweet(),
            fakeTweet(),
            fakeTweet(),
        ]
        res.send(tweets);
        console.log("lol");
    }catch(err){
        next(err);
    }
}

module.exports = {
    feed,
}