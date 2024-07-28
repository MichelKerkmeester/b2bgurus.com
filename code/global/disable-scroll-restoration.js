// Force start at the top of the page on refresh
history.scrollRestoration = "manual";

$(window).on("beforeunload", function () {
  $(window).scrollTop(0);
});
