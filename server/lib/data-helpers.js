"use strict";

const simulateDelay = require("./util/simulate-delay");

module.exports = function makeDataHelpers(db) {
  return {
    saveTweet: function(newTweet, callback) {
      simulateDelay(() => {
        db.tweets.push(newTweet);
        callback(null, true);
      });
    },
    getTweets: function(callback) {
      simulateDelay(() => {
        const sortNewestFirst = (a, b) => {
          return b.created_at - a.created_at;
        }
        callback(null, db.tweets.sort(sortNewestFirst));
      });
    }
  }
}