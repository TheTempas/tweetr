$(document).on("ready", function() {
  // character count only changes when using keyboard
  $(".new-tweet textarea").on("keyup", function () {
    let newChars = 140 - $(this).val().length;
    let counter = $(".new-tweet .counter");
    counter.text(newChars);
    if (newChars < 0) {
      counter.addClass("over-limit");
    } else {
      counter.removeClass("over-limit");
    }
  });
});