$(document).on("ready", function() {

var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

function testTweetEntry (text) {
  if (text.length > 140) {
    return ("Exceeded Character Limit");
  }
  if (text === "" || text === null) {
    return ("Text Area Empty");
  }
}

$(".new-tweet input").on("click", function(event) {
  event.preventDefault();
  const textArea = $(this).parent().children("textarea");
  const errorMessage = testTweetEntry(textArea.val());
  if (errorMessage) {
    let $errorMessage = $("<p>").text(errorMessage)
    $(".new-tweet").prepend($errorMessage);
  } else {
    $.ajax({
      type: "POST",
      url: '/tweets',
      data: $('.new-tweet form').serialize(),
      success: function (data) {
        $("section.tweet-feed").prepend(createTweetElement(data));
        $("textarea").val("");
      }
    });
  };
});

function createTweetElement (tweet) {
  let $article = $("<article>");
  let $header = $("<header>").addClass("tweet-feed-header clearfix");
  let $img = $("<img>").attr('src', tweet.user.avatars.small);
  let $h2 = $("<h2>").text(tweet.user.name);
  let $tweetrHandle = $("<span>").addClass("tweetr-handle").text(tweet.user.handle);
  $header.append($img, $h2, $tweetrHandle);
  let $main = $("<main>").text(tweet.content.text);
  let $footer = $("<footer>").addClass("clearfix");
  let $spanTime = $("<span>").addClass("time-stamp").text(tweet.created_at);
  let $spanIcons = $("<span>").addClass("icons").text("A B C");
  let $finalFooter = $footer.append($spanTime, $spanIcons);
  return $article.append($header, $main, $finalFooter);
}

function renderTweets (tweets) {
  for (let tweet of tweets) {
    console.log(tweet);
    let $tweet = createTweetElement(tweet);
    $("section.tweet-feed").append($tweet);
  };
};

function loadTweets () {
  $.ajax({
    type: "GET",
    url: '/tweets',
    success: function(data) {
    renderTweets(data);
    }
  });
}

loadTweets();

$(".compose").click(function() {
  $(".new-tweet").toggle("fast");
  $('textarea').focus();
});

$(".tweet-feed").on("mouseenter", "article", function() {
  $(this).addClass("hovered");
});

$(".tweet-feed").on("mouseleave", "article", function() {
  $(this).removeClass("hovered");
});


});