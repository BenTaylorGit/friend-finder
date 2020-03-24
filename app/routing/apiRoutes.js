var friends = require("../data/friends");

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {

    var userInput = req.body;
    var userScores = userInput.scores;
    var userDifference;
    var perfectFriend = {
      name: "",
      photo: "",
      difference: Infinity
    };

    for (var i = 0; i < friends.length; i++) {
      var evalNewFriend = friends[i];
      userDifference = 0;
      console.log(evalNewFriend)
      for (var j = 0; j < evalNewFriend.scores.length; j++) {
        var evalNewFriendScore = evalNewFriend.scores[j];
        var tempScore = userScores[j];
        userDifference += Math.abs(parseInt(tempScore) - parseInt(evalNewFriendScore));
        console.log(userDifference)
      }

      if (userDifference <= perfectFriend.difference) {
        perfectFriend.name = evalNewFriend.name;
        perfectFriend.photo = evalNewFriend.photo;
        perfectFriend.difference = userDifference;
      }
    }

    friends.push(userInput);

    res.json(perfectFriend);
  });
};