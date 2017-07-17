$(document).on("ready", function() {

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
  let $spanTime = $("<span>").addClass("time-stamp").text(tweet.fromNow);
  let $spanIcons = $("<span>").addClass("icons").append(`
    <i class="fa fa-flag-o" aria-hidden="true"></i>
    <i class="fa fa-retweet" aria-hidden="true"></i>
    <i class="fa fa-heart-o" aria-hidden="true"></i>
    `
    );
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