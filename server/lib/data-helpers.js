"use strict";

const simulateDelay = require("./util/simulate-delay");

module.exports = function makeDataHelpers(db) {
  return {
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, (err, resutls) => {
        if (err) {
          callback(err);
        } else {
          callback(null);
        }
      });

    },
    getTweets: function(callback) {
      db.collection("tweets").find().toArray((err, results) => {
        const sortNewestFirst = (a, b) => {
          return b.created_at - a.created_at;
        }
        callback(null, results.sort(sortNewestFirst));
      })
    }
  }
}